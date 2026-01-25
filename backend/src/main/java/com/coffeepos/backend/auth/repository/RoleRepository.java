package com.coffeepos.backend.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coffeepos.backend.auth.entity.Role;
import com.coffeepos.backend.common.enums.RoleName;

public interface RoleRepository extends JpaRepository<Role, Long>{
    Optional<Role> findByRoleName(RoleName name);
}
