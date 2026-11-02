package com.taxibooking.controller;

import com.taxibooking.model.Driver;
import com.taxibooking.service.DriverService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    private final DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    @GetMapping
    public List<Driver> getDrivers() {
        return driverService.getAllDrivers();
    }

    @GetMapping("/{id}")
    public Driver getDriver(@PathVariable Long id) {
        return driverService.getDriverById(id);
    }

    @PostMapping
    public Driver addDriver(@Valid @RequestBody Driver driver) {
        return driverService.addDriver(driver);
    }

    @PutMapping("/{id}")
    public Driver updateDriver(@PathVariable Long id, @RequestBody Driver driver) {
        return driverService.updateDriver(id, driver);
    }

    @DeleteMapping("/{id}")
    public void deleteDriver(@PathVariable Long id) {
        driverService.deleteDriver(id);
    }
}
