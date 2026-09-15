package com.example.Londery_management.Repo;

import com.example.Londery_management.Models.Londerypacksmodel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LonderyPackRepo extends JpaRepository<Londerypacksmodel,Long> {
    Optional<Londerypacksmodel> findByPackTitle(String packTitle);
}
