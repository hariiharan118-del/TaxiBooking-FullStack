# Taxi Booking System

## Architecture

- Frontend: React
- Backend: Spring Boot + Spring Data JPA
- Database: PostgreSQL
- Frontend API: `http://localhost:8080/api`

The React frontend **does not connect directly to PostgreSQL**. It calls the Spring Boot REST API, and the Spring Boot backend reads/writes PostgreSQL through JPA/Hibernate.

## PostgreSQL setup

This project is configured to use a local PostgreSQL database named `app`.

Create the database once:

```sql
CREATE DATABASE app;
```

Then configure the backend credentials. You can either:

1. Use the defaults in `application.properties` (`postgres` / `postgres`), if those match your PostgreSQL installation, or
2. Set environment variables:

```bash
export DB_URL="jdbc:postgresql://localhost:5432/app"
export DB_USERNAME="postgres"
export DB_PASSWORD="your_actual_password"
```

You can also copy `.env.example` as a reference. Spring Boot does not automatically load a frontend-style `.env` file, so export the variables in the shell/IDE run configuration or configure them in IntelliJ.

## Start backend

From `taxi-booking-backend`:

```bash
mvn clean spring-boot:run
```

On first startup, Hibernate creates/updates these tables in PostgreSQL:

- `app_user`
- `vehicle`
- `driver`
- `booking`

## Start frontend

From `taxi-booking-frontend`:

```bash
npm install
npm start
```

The frontend `.env` already points to:

```text
REACT_APP_API_URL=http://localhost:8080/api
```

## Important

Do not put PostgreSQL credentials in the React frontend. Database credentials must remain on the Spring Boot backend.

`database/schema.sql` is included as a reference/manual schema. Normally you do **not** need to run it because `spring.jpa.hibernate.ddl-auto=update` lets Hibernate create/update the tables.
