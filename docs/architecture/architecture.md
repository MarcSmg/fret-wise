# Architecture / Design documentation.

## 1. Overview

Fretwise is a web-based platform allowing users to search, visualize, and download guitar chord diagrams.

The system follows a client-server architecture composed of:
- a frontend application responsible for user interaction and chord rendering
- a backend service responsible for authentication, data persistence

## 2. Architectural Goals

The architecture is designed to:
- provide fast chord retrieval,
- support scalable chord rendering,
- simplify future feature additions like recommendation systems,
- maintain modularity.

## 3. System Architecture

The system is divided into the following layers:

- Frontend layer
- Backend API layer
- Database layer

### Frontend Application

Responsible for:
- music theory engine,
- chord parsing,
- SVG rendering,
- fretboard logic,
- user interaction,
- chord search interface,
- diagram visualization,
- download initiation,
- chord progression creation.

### Backend Service

Responsible for:

- persistence,
- favorites,
- saved progressions,
- user data,
- search APIs,
- recommendation systems,
- metadata,
- analytics (later).

## 4. Data Flow

1. User submits a chord search request.
2. Frontend sends request to backend API.
3. Frontend parses chord notation.
4. Matching chord data is generated.
5. Chord data is sent to backend
6. Chord service
5. Rendering engine generates diagram.
6. Generated diagram is returned to frontend.
7. Frontend displays visualization to user.

## 5. Key Technical Decisions

### PostgreSQL was selected because:
- chord relationships are strongly structured,
- relational consistency is beneficial,
- query flexibility is required.

### SVG was chosen for rendering because:
- vector graphics scale cleanly,
- diagrams remain lightweight,
- exports preserve quality.

## 6. Security Considerations

The system validates user input before chord parsing to prevent malformed requests and injection attacks.

## 7. Scalability & Performance

Chord rendering operations may be cached to reduce repeated diagram generation costs.

## 8. Deployment Architecture