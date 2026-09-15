package com.example.Londery_management.Repo;

import com.example.Londery_management.Models.Itemsmodel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemsRepo extends JpaRepository<Itemsmodel,Long> {
    Optional<Itemsmodel> findByName(String title);
    List<Itemsmodel> findBySupplierId(Long supplierId);


}
