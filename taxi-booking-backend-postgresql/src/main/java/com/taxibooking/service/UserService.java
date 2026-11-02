package com.taxibooking.service;

import com.taxibooking.exception.ResourceNotFoundException;
import com.taxibooking.model.User;
import com.taxibooking.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getUsersByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(List::of)
                .orElseGet(List::of);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        return user;
    }

    public User register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("An account with this email already exists");
        }
        if (user.getRole() == null) {
            user.setRole(com.taxibooking.model.Role.CUSTOMER);
        }
        return userRepository.save(user);
    }

    public User updateUser(Long id, User updated) {
        User existing = getUserById(id);
        existing.setName(updated.getName());
        existing.setPhone(updated.getPhone());
        if (updated.getPassword() != null && !updated.getPassword().isBlank()) {
            existing.setPassword(updated.getPassword());
        }
        if (updated.getRole() != null) {
            existing.setRole(updated.getRole());
        }
        return userRepository.save(existing);
    }

    public void deleteUser(Long id) {
        userRepository.delete(getUserById(id));
    }
}
