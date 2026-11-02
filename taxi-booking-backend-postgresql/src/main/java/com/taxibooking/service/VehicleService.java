package com.taxibooking.service;

import com.taxibooking.exception.ResourceNotFoundException;
import com.taxibooking.model.Vehicle;
import com.taxibooking.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found with id: " + id));
    }

    public Vehicle addVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public Vehicle updateVehicle(Long id, Vehicle updated) {
        Vehicle existing = getVehicleById(id);
        existing.setModel(updated.getModel());
        existing.setLicensePlate(updated.getLicensePlate());
        existing.setCapacity(updated.getCapacity());
        existing.setAvailable(updated.isAvailable());
        return vehicleRepository.save(existing);
    }

    public void deleteVehicle(Long id) {
        vehicleRepository.delete(getVehicleById(id));
    }
}
