package com.coffeepos.backend.auth.service;


import java.util.Optional;

import org.springframework.stereotype.Service;

import com.coffeepos.backend.auth.entity.Role;
import com.coffeepos.backend.auth.repository.RoleRepository;
import com.coffeepos.backend.common.enums.RoleName;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService (RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Optional<Role> getByName(RoleName roleName) {
        return roleRepository.findByRoleName(roleName);
    }
}
