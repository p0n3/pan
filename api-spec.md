# API Specification for Tage

This document describes the REST API endpoints that need to be implemented for the production mode of Tage.

## Base URL

All endpoints should be prefixed with your API base URL, for example:
- `https://your-api.com/api`
- `http://localhost:3001/api`

## Data Models

### Person
```json
{
  "id": "string",
  "name": "string",
  "birthDate": "string", // ISO date string (YYYY-MM-DD)
  "groupId": "string"
}
```

### Group
```json
{
  "id": "string",
  "name": "string",
  "color": "string" // Hex color code (e.g., "#3b82f6")
}
```

### Sort Preference
```json
{
  "sortPreference": "string" // One of: "birthday-asc", "age-desc", "age-asc", "name-asc", "name-desc", "group"
}
```

## Endpoints

### People

#### GET /people
Get all people.

**Response:**
```json
[
  {
    "id": "1",
    "name": "John Doe",
    "birthDate": "1990-05-15",
    "groupId": "1"
  }
]
```

#### POST /people
Create a new person.

**Request Body:**
```json
{
  "name": "John Doe",
  "birthDate": "1990-05-15",
  "groupId": "1"
}
```

**Response:**
```json
{
  "id": "1",
  "name": "John Doe",
  "birthDate": "1990-05-15",
  "groupId": "1"
}
```

#### PUT /people/:id
Update an existing person.

**Request Body:**
```json
{
  "name": "John Smith",
  "birthDate": "1990-05-15",
  "groupId": "2"
}
```

**Response:**
```json
{
  "id": "1",
  "name": "John Smith",
  "birthDate": "1990-05-15",
  "groupId": "2"
}
```

#### DELETE /people/:id
Delete a person.

**Response:** 204 No Content

### Groups

#### GET /groups
Get all groups.

**Response:**
```json
[
  {
    "id": "1",
    "name": "Family",
    "color": "#ef4444"
  }
]
```

#### POST /groups
Create a new group.

**Request Body:**
```json
{
  "name": "Family",
  "color": "#ef4444"
}
```

**Response:**
```json
{
  "id": "1",
  "name": "Family",
  "color": "#ef4444"
}
```

#### PUT /groups/:id
Update an existing group.

**Request Body:**
```json
{
  "name": "Close Family",
  "color": "#dc2626"
}
```

**Response:**
```json
{
  "id": "1",
  "name": "Close Family",
  "color": "#dc2626"
}
```

#### DELETE /groups/:id
Delete a group.

**Response:** 204 No Content

### Preferences

#### GET /preferences/sort
Get the current sort preference.

**Response:**
```json
{
  "sortPreference": "birthday-asc"
}
```

#### PUT /preferences/sort
Update the sort preference.

**Request Body:**
```json
{
  "sortPreference": "age-desc"
}
```

**Response:**
```json
{
  "sortPreference": "age-desc"
}
```

## Error Handling

All endpoints should return appropriate HTTP status codes:

- `200 OK` - Successful GET/PUT requests
- `201 Created` - Successful POST requests
- `204 No Content` - Successful DELETE requests
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server errors

Error responses should include a message:
```json
{
  "error": "Person not found"
}
```

## CORS

Make sure your API server includes appropriate CORS headers to allow requests from your frontend domain.

## Authentication (Optional)

If you need authentication, you can add Authorization headers. The frontend is configured to accept custom headers in the API service configuration.

