package com.alby.hotelservice.service;

import com.alby.hotelservice.dto.SignupRequest;
import com.alby.hotelservice.dto.UserDto;

public interface AuthService {
    UserDto createUser (SignupRequest signupRequest);
}
