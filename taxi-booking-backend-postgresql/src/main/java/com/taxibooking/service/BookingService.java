package com.taxibooking.service;

import com.taxibooking.exception.ResourceNotFoundException;
import com.taxibooking.model.Booking;
import com.taxibooking.model.BookingStatus;
import com.taxibooking.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByCustomer(String email) {
        return bookingRepository.findByCustomerEmail(email);
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
    }

    public Booking createBooking(Booking booking) {
        if (booking.getStatus() == null) {
            booking.setStatus(BookingStatus.REQUESTED);
        }
        return bookingRepository.save(booking);
    }

    public Booking updateStatus(Long id, BookingStatus status) {
        Booking booking = getBookingById(id);
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    public Booking assignDriver(Long id, String driverName) {
        Booking booking = getBookingById(id);
        booking.setDriverName(driverName);
        booking.setStatus(BookingStatus.CONFIRMED);
        return bookingRepository.save(booking);
    }

    public void deleteBooking(Long id) {
        bookingRepository.delete(getBookingById(id));
    }
}
