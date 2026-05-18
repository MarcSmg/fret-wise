# Phases

## Phase 1 — Minimal API foundation

Goal: Learn Django + DRF basics

Build:

- project setup
- one app (chords)
- one endpoint
- PostgreSQL connection

Example:

GET /api/chords/

Learn only:

- project/app structure
- models
- serializers
- views
- urls

Use:

- official Django docs
- official DRF docs
- AI for explanations/debugging

## Phase 2 — Persistence

Add:

- favorites
- saved chords

Learn:

- relationships
- foreign keys
- authentication basics

## Phase 3 — Auth

Add:

- login/register
- protected routes
- tokens or session auth

Learn:

- DRF authentication
- permissions
- middleware concepts

## Phase 4 — Better architecture

Only now start learning:

- services
- modularization
- settings splitting
- environment variables

## Phase 5 — Production concerns

Later:

- Gunicorn
- deployment
- caching
- async tasks
- Docker

# Git branching strategy

We will use the **feature branching strategy**.

0. Main branch

`main`

Always stable.

## Phase 1 — Minimal API foundation

1. Initial setup

`feature/backend-setup`

Contains:

- Django setup
- DRF install
- PostgreSQL connection
- basic config
- initial app creation

Merge after the backend runs correctly.

2. Basic chord API

`feature/chord-api-foundation`

Contains:

- Chord model
- serializer
- basic view
- endpoint:
- GET /api/chords/

Merge after the endpoint works.

## Phase 2 — Persistence

3. Saved chords

`feature/saved-chords`

Contains:

- saved chord model
- user relationship
- persistence logic

4. Favorites

`feature/favorites`

Contains:

- favorite system
- favorite endpoints

You could combine both if they are tightly related:

`feature/user-chord-persistence`

That would also be acceptable.

## Phase 3 — Authentication

5. Authentication system

`feature/authentication`

Contains:

- registration
- login
- token/session auth

6. Permissions

`feature/permissions`

Contains:

- protected endpoints
- ownership rules
- DRF permissions

## Phase 4 — Better architecture

This phase is mostly refactoring and structure.

7. Services layer

`refactor/services-layer`

Contains:

- moving business logic out of views
- service modules\

8. Environment/config cleanup

`refactor/settings-architecture`

Contains:

- env vars
- split settings
- config cleanup

## Phase 5 — Production concerns

9. Deployment setup

`feature/deployment-setup`

Contains:

- Gunicorn
- static handling
- production settings

10. Dockerization

`feature/docker-support`

Contains:

- Dockerfile
- docker-compose
- container setup

# Important 

Development should be done through feature branches and merged into `main` using pull requests.  
Use *squash* merges to keep the commit history clean and organized.