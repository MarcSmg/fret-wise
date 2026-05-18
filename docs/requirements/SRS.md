# System Requirements Specification

## 1. Functional Requirements

- Users shall be able to register and login
- Users shall be able to search chord diagrams by chord name.
- The system shall render chord diagrams.
- Users shall be able to download chord diagrams in PNG, JPG and SVG formats
- The system shall render chord diagrams.
- The system shall display available chord inversions
- The system shall generate chord diagrams dynamically from valid chord names.
- The system shall notify users when a chord cannot be found.


## 2. Nonfunctional Requirements

- The system shall return chord search results in under 1 second for 95% of requests.
- The platform shall support modern mobile and desktop browsers.
The platform should be reliably accessible during normal usage conditions.
- Generated SVG downloads shall preserve diagram quality at all resolutions.

## 3. Use cases

### **Use Case**: Search Chord Diagram

**Actor**:
- User

**Preconditions**:
- The user is authenticated

**Main Flow**:
1. User enters a chord name
2. System parses the chord
3. System retrieves matching diagrams
4. System displays chord diagrams

**Alternative Flow**:
1. If at (2) the chord is invalid, the system displays "No chord found, please check the chord name and try again"

**Postconditions**:
- Matching chord diagrams are visible

## 4. Constraints

- The platform must be web-based.
- The system must support SVG exports.

## 5. Acceptance criteria

### Users shall be able to search chord diagrams by name.

- Valid chord names return matching diagrams
- For invalid chord names the system displays "No chord found, please check the chord name and try again"
- Search results appear in under 1 second

### Users shall be able to download chord diagrams.

- Download button is visible on the chord page
- Clicking download generates a PNG/JPG/SVG file
- Generated file opens successfully
- Download completes in under 3 seconds

## 6. External interfaces

### User Interface
- Web-based interface accessible from modern browsers
- Search field for chord names
- Chord visualization area
- Download controls

### Software Interfaces
- REST API for chord search and retrieval
- SVG rendering module for diagram generation

### Communication Interfaces
- HTTPS for client-server communication
- JSON data exchange between frontend and backend

## 7. Assumptions

- Users understand standard chord notation
- Users have internet access
- Modern browsers support SVG rendering

## 8. Error Handling Requirements

- The system shall display informative messages for invalid chord names.
- The system shall prevent invalid download requests.