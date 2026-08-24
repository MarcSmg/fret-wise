// Register
export interface ApiRegisterRequest {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface ApiRegisterResponse {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

// Login
export interface ApiLoginRequest {
  login: string;
  password: string;
  remember?: boolean;
}

export interface ApiLoginResponse {
  access: string;
}

// Me
export interface ApiUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  dateJoined: string;
  lastLogin: string | null;
  isActive: boolean;
  profile: ApiUserProfile;
}

export interface ApiUpdateUserRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
}

// Refresh
// Refresh token travels via the HttpOnly cookie, not the request body.
export interface ApiRefreshResponse {
  access: string;
}

// Logout
// Refresh token travels via the HttpOnly cookie, not the request body.

// User Profile
export interface ApiUserProfile {
  user: number;
  notation: string;
  tuning: string;
  updatedAt: string;
}

export interface ApiUpdateProfileRequest {
  notation?: string;
  tuning?: string;
}