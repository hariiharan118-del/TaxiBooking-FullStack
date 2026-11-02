package com.taxibooking.service;

import com.taxibooking.exception.ResourceNotFoundException;
import com.taxibooking.model.Driver;
import com.taxibooking.repository.DriverRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverService {

    private final DriverRepository driverRepository;

    public DriverService(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    public Driver getDriverById(Long id) {
        return driverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found with id: " + id));
    }

    public Driver addDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    public Driver updateDriver(Long id, Driver updated) {
        Driver existing = getDriverById(id);
        existing.setName(updated.getName());
        existing.setEmail(updated.getEmail());
        existing.setPhone(updated.getPhone());
        existing.setVehicle(updated.getVehicle());
        existing.setAvailable(updated.isAvailable());
        existing.setRating(updated.getRating());
        return driverRepository.save(existing);
    }

    public void deleteDriver(Long id) {
        driverRepository.delete(getDriverById(id));
    }
}
