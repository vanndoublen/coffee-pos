package com.coffeepos.backend.user.service;

import org.springframework.stereotype.Service;

import com.coffeepos.backend.common.exception.NotFoundException;
import com.coffeepos.backend.user.dto.UserResponse;
import com.coffeepos.backend.user.entity.User;
import com.coffeepos.backend.user.mapper.UserMapper;
import com.coffeepos.backend.user.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserResponse getByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User", username));

        return userMapper.toResponse(user);
    }

    public UserResponse getById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User", id));

        return userMapper.toResponse(user);
    }

    public Boolean isUsernameExisted(String username) {
        return userRepository.existsByUsername(username);
    }

}

// forever is a long time to go with the flow 