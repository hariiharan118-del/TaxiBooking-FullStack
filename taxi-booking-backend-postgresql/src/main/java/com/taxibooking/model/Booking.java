package com.taxibooking.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String pickupLocation;

    @NotBlank
    private String destination;

    @NotBlank
    private String customerEmail;

    private String driverName;

    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.REQUESTED;

    private double fare;

    public Booking() {
    }

    public Booking(String pickupLocation, String destination, String customerEmail,
                    String driverName, BookingStatus status, double fare) {
        this.pickupLocation = pickupLocation;
        this.destination = destination;
        this.customerEmail = customerEmail;
        this.driverName = driverName;
        this.status = status;
        this.fare = fare;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPickupLocation() {
        return pickupLocation;
    }

    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public double getFare() {
        return fare;
    }

    public void setFare(double fare) {
        this.fare = fare;
    }
}
