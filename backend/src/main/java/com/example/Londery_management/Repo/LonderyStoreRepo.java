package com.example.Londery_management.Repo;

import com.example.Londery_management.Models.LonderyStoremodel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LonderyStoreRepo extends JpaRepository<LonderyStoremodel,Long>{

    Optional<LonderyStoremodel> findByItemName(String itemName);
}
