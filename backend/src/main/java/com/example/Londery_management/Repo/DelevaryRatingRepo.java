package com.example.Londery_management.Repo;

import com.example.Londery_management.DTO.DeleveryRatingDTO;
import com.example.Londery_management.Models.DeleveryRatingmodel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DelevaryRatingRepo extends JpaRepository <DeleveryRatingmodel, Long> {


}
