# Taxi Booking Frontend

React frontend for the Taxi Booking System.

## Backend connection

The frontend talks to the Spring Boot backend, not directly to PostgreSQL.

`.env` contains:

```text
REACT_APP_API_URL=http://localhost:8080/api
```

Make sure the Spring Boot backend is running before using login, registration, bookings, drivers, or vehicles.

## Run

```bash
npm install
npm start
```
