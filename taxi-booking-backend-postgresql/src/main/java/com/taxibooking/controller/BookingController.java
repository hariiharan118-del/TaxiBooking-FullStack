package com.taxibooking.controller;

import com.taxibooking.model.Booking;
import com.taxibooking.model.BookingStatus;
import com.taxibooking.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public List<Booking> getBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/customer")
    public List<Booking> getCustomerBookings(@RequestParam String email) {
        return bookingService.getBookingsByCustomer(email);
    }

    @GetMapping("/{id}")
    public Booking getBooking(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }

    @PostMapping
    public Booking createBooking(@Valid @RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    @PutMapping("/{id}/status")
    public Booking updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        BookingStatus status = BookingStatus.valueOf(body.get("status").toUpperCase());
        return bookingService.updateStatus(id, status);
    }

    @PutMapping("/{id}/assign")
    public Booking assignDriver(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return bookingService.assignDriver(id, body.get("driverName"));
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
    }
}
