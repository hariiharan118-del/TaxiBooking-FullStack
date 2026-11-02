package com.taxibooking;

import com.taxibooking.model.*;
import com.taxibooking.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TaxiBookingApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaxiBookingApplication.class, args);
    }

    @Bean
    CommandLineRunner seedData(UserRepository userRepository,
                                VehicleRepository vehicleRepository,
                                DriverRepository driverRepository,
                                BookingRepository bookingRepository) {
        return args -> {
            if (userRepository.count() > 0) {
                return;
            }

            User admin = userRepository.save(
                    new User("Admin", "admin@taxibooking.com", "9999999999", "admin123", Role.ADMIN));
            User customer = userRepository.save(
                    new User("Hariharan", "hari@example.com", "9876543210", "customer123", Role.CUSTOMER));
            userRepository.save(
                    new User("John", "john.driver@taxibooking.com", "9123456780", "driver123", Role.DRIVER));

            Vehicle sedan = vehicleRepository.save(new Vehicle("Sedan", "TN01AB1234", 4, true));
            Vehicle suv = vehicleRepository.save(new Vehicle("SUV", "TN01CD5678", 6, true));

            Driver john = driverRepository.save(new Driver("John", "john.driver@taxibooking.com",
                    "9123456780", sedan, true, 4.8));
            driverRepository.save(new Driver("David", "david.driver@taxibooking.com",
                    "9123456781", suv, false, 4.5));

            Booking sample = new Booking("MG Road", "Airport", customer.getEmail(),
                    john.getName(), BookingStatus.COMPLETED, 350);
            bookingRepository.save(sample);
        };
    }
}
