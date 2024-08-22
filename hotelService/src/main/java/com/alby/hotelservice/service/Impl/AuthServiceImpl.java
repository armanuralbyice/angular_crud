package com.alby.hotelservice.service.Impl;


import com.alby.hotelservice.dto.SignupRequest;
import com.alby.hotelservice.dto.UserDto;
import com.alby.hotelservice.entity.User;
import com.alby.hotelservice.enums.UserRole;
import com.alby.hotelservice.repository.UserRepository;
import com.alby.hotelservice.service.AuthService;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void createAnAdminAccount(){
        Optional<User> adminAccount = userRepository.findByUserRole(UserRole.ADMIN);
        if(adminAccount.isEmpty()){
            User user = new User();
            user.setEmail("admin@gmail.com");
            user.setPassword(new BCryptPasswordEncoder().encode("admin"));
            user.setName("Admin");
            user.setUserRole(UserRole.ADMIN);
            user = userRepository.save(user);
            System.out.println("Account created successfully" +user);
        }
        else{
            System.out.println("Account already exists");
        }
    }

    @Override
    public UserDto createUser(SignupRequest signupRequest) {
        if (userRepository.findFirstByEmail(signupRequest.getEmail()).isPresent()){
            throw new EntityExistsException("Email already exists");
        }
        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        user.setName(signupRequest.getName());
        user.setUserRole(UserRole.CUSTOMER);
        User createUser = userRepository.save(user);
        return createUser.getUserDto();
    }
}
