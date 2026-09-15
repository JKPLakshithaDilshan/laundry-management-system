package com.example.Londery_management.Repo;

import com.example.Londery_management.Models.Usermodel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Usermodel,Long> {

  Optional<Usermodel> findByEmail(String email);
}
