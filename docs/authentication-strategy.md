# Authentication Strategy

## 1. Purpose

ChordOpus uses short-lived JSON Web Tokens (JWTs) for API authentication.
Authentication state is coordinated by the React application, while Django owns
credential validation, token issuance, refresh-token rotation, revocation, and
user persistence.

The strategy is designed to:

- keep long-lived credentials inaccessible to frontend JavaScript;
- restore a user's session after a page reload;
- refresh expired access tokens without interrupting the user;
- revoke the active refresh token during logout;
- protect authenticated routes consistently across the application;
- keep authentication separate from the frontend music-theory engine.

## 2. Token Storage Policy

| Value | Storage location | Lifetime | JavaScript access |
| --- | --- | --- | --- |
| Access token | Frontend memory | 15 minutes | Yes |
| Refresh token | Secure, HttpOnly cookie | 7 days | No |
| Current user | React state/context | Current browser session | Yes |

Neither token is stored in `localStorage` or `sessionStorage`.

The access token is deliberately kept in memory. An injected script could use
it while the page is compromised, but it cannot retrieve a persistent
credential from browser storage. Reloading the application clears the access
token; the application then obtains a new one through the refresh endpoint.

The refresh token is stored in an HttpOnly cookie. The browser attaches this
cookie to eligible requests automatically, but JavaScript cannot read its
value. This limits the impact of token theft through cross-site scripting
(XSS), although XSS prevention remains necessary because malicious code could
still make requests during an active session.

## 3. Authentication Flow

### 3.1 Registration

1. The user submits their registration details.
2. The frontend sends `POST /api/auth/register/`.
3. Django validates the data and creates the user.
4. The frontend either:
   - redirects the user to login; or
   - performs a separate login request if automatic login is desired.

Registration should not duplicate token-issuance logic. Automatic login, if
used, should call the same login service as the normal login form.

### 3.2 Login

1. The user submits their username or email and password.
2. The frontend sends `POST /api/auth/login/` with credentials.
3. Django validates the credentials and creates an access/refresh token pair.
4. Django:
   - returns the access token in the JSON response;
   - sets the refresh token in an HttpOnly cookie;
   - does not expose the refresh token in the response body.
5. The frontend stores the access token in memory.
6. The frontend requests `GET /api/auth/me/`.
7. The authentication provider stores the returned user in React state.
8. The user is redirected to their original destination or `/home`.

Suggested successful response:

```http
HTTP/1.1 200 OK
Set-Cookie: refresh_token=<token>; HttpOnly; Secure; SameSite=Lax; Path=/api/auth/
Content-Type: application/json
```

```json
{
  "access": "<access-token>"
}
```

The login UI's “Remember me” option should not move tokens into web storage.
If the application supports this option, it should control the refresh
cookie's persistence:

- selected: issue a persistent cookie with a seven-day `Max-Age`;
- not selected: issue a session cookie without `Max-Age` or `Expires`.

### 3.3 Authenticated API Requests

The Axios client attaches the in-memory access token to API requests:

```http
Authorization: Bearer <access-token>
```

The refresh cookie is not used to authenticate ordinary API endpoints.
It should be scoped to the authentication URL path so it is only sent to
login, refresh, and logout endpoints.

### 3.4 Application Startup

The access token disappears whenever the page reloads. On application startup:

1. `AuthProvider` enters an initializing state.
2. It sends `POST /api/auth/refresh/`.
3. The browser includes the refresh cookie automatically.
4. If refresh succeeds:
   - Django rotates the refresh token;
   - Django replaces the refresh cookie;
   - Django returns a new access token;
   - the provider stores the access token in memory;
   - the provider requests `/api/auth/me/`;
   - the provider stores the current user.
5. If refresh fails:
   - the access token and user state are cleared;
   - Django clears an invalid or expired refresh cookie where appropriate;
   - the application continues as an unauthenticated user.
6. Initialization ends and the router renders the appropriate route.

The application should show a full-page loading state during initialization.
It must not briefly redirect to `/login` before session restoration finishes.

### 3.5 Access-Token Expiration

When an authenticated request receives a `401 Unauthorized` response:

1. The Axios response interceptor pauses the failed request.
2. It sends one request to `POST /api/auth/refresh/`.
3. Django validates and rotates the refresh token.
4. The client stores the new access token in memory.
5. The client retries the original request once.

Only one refresh request may run at a time. If several requests fail
concurrently, they must wait for the same refresh operation rather than rotate
the refresh token several times.

The interceptor must not attempt refresh when:

- the failed request is the login endpoint;
- the failed request is the refresh endpoint;
- the request has already been retried;
- the response status is not `401`.

If refresh fails, the client clears authentication state and redirects the user
to login. This transition should be emitted through a small callback or auth
session service so the API module does not import React or the router directly.

### 3.6 Logout

1. The frontend sends `POST /api/auth/logout/`.
2. The browser includes the refresh cookie.
3. Django reads the refresh token from the cookie and blacklists it.
4. Django deletes the refresh cookie.
5. The frontend clears the in-memory access token and current user.
6. The router redirects to `/login`.

Local authentication state must be cleared in a `finally` block, even if the
network request fails. This ensures that selecting logout always ends the local
session.

## 4. Backend Responsibilities

### 4.1 Login Endpoint

The login endpoint must:

- accept the supported login identifier and password;
- validate credentials through Django authentication;
- generate an access/refresh token pair;
- return only the access token in JSON;
- set the refresh token cookie;
- return generic invalid-credential errors that do not disclose whether an
  account exists.

If both email and username are accepted, that behavior must be implemented and
tested in the custom authentication backend. Merely renaming SimpleJWT's
`username_field` does not implement email lookup.

### 4.2 Refresh Endpoint

The refresh endpoint must:

- read the refresh token from `request.COOKIES`;
- reject missing, invalid, expired, or blacklisted tokens;
- rotate the token on every successful refresh;
- blacklist the previous refresh token;
- set the rotated refresh token as a replacement cookie;
- return only the new access token in JSON.

SimpleJWT settings should retain:

```python
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=15),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "AUTH_HEADER_TYPES": ("Bearer",),
}
```

### 4.3 Logout Endpoint

The logout endpoint must:

- read the refresh token from the cookie rather than the request body;
- blacklist it when it is valid;
- delete the cookie whether blacklisting succeeds or not;
- avoid requiring a valid access token solely to clear the cookie.

Requiring an access token for logout can prevent cleanup when the access token
has just expired. The refresh cookie itself is sufficient to identify the
refresh token that needs revocation.

### 4.4 Current-User Endpoint

`GET /api/auth/me/` remains protected by SimpleJWT's bearer-token
authentication. It returns the canonical user representation used by the
frontend:

```json
{
  "id": 1,
  "username": "player",
  "email": "player@example.com"
}
```

## 5. Cookie Configuration

For a same-site production deployment, use:

```python
response.set_cookie(
    key="refresh_token",
    value=str(refresh_token),
    httponly=True,
    secure=not settings.DEBUG,
    samesite="Lax",
    max_age=7 * 24 * 60 * 60,
    path="/api/auth/",
)
```

Cookie deletion must use the same `path` and compatible `samesite` values used
when creating it.

Production should preferably expose the frontend and API under the same site,
for example `app.chordopus.com` and `api.chordopus.com`. This allows a
`SameSite=Lax` cookie while the frontend and API remain separate deployments.

If the frontend and API are genuinely cross-site, the cookie requires:

```text
Secure; SameSite=None
```

That configuration increases cross-site request forgery (CSRF) exposure and
must only be used with explicit CSRF protection.

## 6. CSRF, CORS, and XSS

### CSRF

The refresh and logout endpoints authenticate through a cookie, so they must
be protected against CSRF even though ordinary API requests use bearer tokens.

The frontend should obtain Django's CSRF token and send it in the
`X-CSRFToken` header for cookie-authenticated state-changing requests.
The server must validate that token. `CSRF_TRUSTED_ORIGINS` should contain only
the actual frontend origins.

### CORS

The Axios client must use:

```ts
withCredentials: true
```

Django must:

- enable credentialed CORS responses;
- list exact trusted frontend origins;
- never combine credentialed requests with `Access-Control-Allow-Origin: *`.

### XSS

HttpOnly cookies prevent JavaScript from reading the refresh token, but they do
not make XSS harmless. ChordOpus must still:

- avoid rendering unsanitized HTML;
- avoid unnecessary `dangerouslySetInnerHTML`;
- validate and encode user-controlled content;
- use a restrictive Content Security Policy in production;
- keep dependencies patched.

## 7. Frontend Architecture

### API Client

`frontend/src/api/client.ts` owns:

- the Axios instance;
- the in-memory access token setter/getter;
- attaching bearer authorization;
- coordinated token refresh;
- retrying a failed request once;
- notifying the auth layer when the session expires.

It must not store React state or navigate directly.

### Authentication API

`frontend/src/api/auth.ts` owns:

- `register`;
- `login`;
- `refresh`;
- `me`;
- `logout`;
- request and response types for those endpoints.

It must not access browser token storage because token persistence is handled
by the server cookie.

### Authentication Provider

`AuthProvider` is the application's source of truth for:

- `user`;
- `isAuthenticated`;
- `isInitializing`;
- `login`;
- `register`;
- `logout`.

`isAuthenticated` is derived from the presence of a current user, not from the
presence of a token.

The provider performs session restoration during startup and coordinates user
state with the API client's in-memory access token.

### Forms

Login and registration forms must:

- use controlled values or a form library;
- prevent the default browser submission;
- call the authentication provider;
- disable repeated submission while pending;
- show field and non-field API validation errors;
- navigate only after successful authentication.

### Route Guards

Authenticated routes are nested under a protected-route component. If the user
is unauthenticated after initialization, it redirects to `/login` and records
the requested location.

Login and signup routes are nested under a guest-route component. Authenticated
users visiting them are redirected to `/home`.

Guards must wait for authentication initialization before deciding whether to
redirect.

## 8. API Contract Summary

| Endpoint | Authentication input | Successful output |
| --- | --- | --- |
| `POST /api/auth/register/` | Registration JSON | Created user or success response |
| `POST /api/auth/login/` | Credentials JSON | Access token JSON + refresh cookie |
| `POST /api/auth/refresh/` | Refresh cookie + CSRF header | Access token JSON + rotated cookie |
| `GET /api/auth/me/` | Bearer access token | Current user JSON |
| `POST /api/auth/logout/` | Refresh cookie + CSRF header | Empty success response + deleted cookie |

## 9. Error Handling

- `400`: display validated field or request errors.
- `401` from an ordinary authenticated request: attempt one coordinated refresh.
- `401` from login: show a generic invalid-credentials message.
- `401` from refresh: end the local session without retrying refresh.
- `403`: show a permission error; do not treat it automatically as token expiry.
- network failure during startup: present an unauthenticated state or a
  retryable connection error according to the product's offline policy.
- network failure during logout: clear local state regardless.

## 10. Testing Requirements

Backend tests should verify:

- successful and failed login;
- username and email login, if both are supported;
- refresh token is absent from response JSON;
- refresh cookie has the required security attributes;
- refresh rotation replaces and blacklists the previous token;
- expired, invalid, and reused refresh tokens are rejected;
- logout blacklists the token and deletes the cookie;
- CSRF and CORS behavior for allowed and untrusted origins.

Frontend tests should verify:

- login stores the access token only in memory;
- startup refresh restores the user;
- failed startup refresh leaves the user logged out;
- one `401` refreshes and retries the original request;
- concurrent `401` responses produce only one refresh request;
- a failed refresh clears authentication state;
- route guards wait for initialization;
- protected and guest routes redirect correctly;
- logout clears local state even when the API request fails.

## 11. Implementation Order

1. Replace the SimpleJWT login/refresh views with cookie-aware views.
2. Update logout to read and delete the refresh cookie.
3. Add CSRF protection and verify exact CORS origins.
4. Refactor the Axios client to hold the access token in memory.
5. Add coordinated refresh and single-retry behavior.
6. Implement the authentication API module and types.
7. Complete `AuthProvider` startup, login, registration, and logout flows.
8. Connect the authentication forms.
9. Add protected-route and guest-route guards.
10. Add backend and frontend authentication tests.

## 12. Final Security Rule

ChordOpus must use:

> Short-lived access tokens in memory and rotating refresh tokens in Secure,
> HttpOnly cookies. Neither token is persisted in browser web storage.

