-- Taxi Booking PostgreSQL database
-- Create the database once (run as a PostgreSQL admin):
-- CREATE DATABASE app;
--
-- The Spring Boot application uses Hibernate ddl-auto=update, so tables
-- are created/updated automatically when the backend starts.
--
-- This file is provided as a reference/manual schema.

CREATE TABLE IF NOT EXISTS app_user (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'CUSTOMER'
        CHECK (role IN ('CUSTOMER', 'DRIVER', 'ADMIN'))
);

CREATE TABLE IF NOT EXISTS vehicle (
    id BIGSERIAL PRIMARY KEY,
    model VARCHAR(255) NOT NULL,
    license_plate VARCHAR(255) NOT NULL UNIQUE,
    capacity INTEGER NOT NULL DEFAULT 4,
    available BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS driver (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(255),
    vehicle_id BIGINT REFERENCES vehicle(id),
    available BOOLEAN NOT NULL DEFAULT TRUE,
    rating DOUBLE PRECISION NOT NULL DEFAULT 5.0
);

CREATE TABLE IF NOT EXISTS booking (
    id BIGSERIAL PRIMARY KEY,
    pickup_location VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    driver_name VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'REQUESTED'
        CHECK (status IN ('REQUESTED', 'CONFIRMED', 'ONGOING', 'COMPLETED', 'CANCELLED')),
    fare DOUBLE PRECISION NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_booking_customer_email
    ON booking(customer_email);
