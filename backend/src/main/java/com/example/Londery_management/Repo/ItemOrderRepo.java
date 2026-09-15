package com.example.Londery_management.Repo;

import com.example.Londery_management.Models.ItemsOrdermodel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemOrderRepo extends JpaRepository<ItemsOrdermodel,Long> {

    Optional<ItemsOrdermodel> findByItem_ItemId(Long itemId);

    List<ItemsOrdermodel> findBySupplier_Id(Long supplierId);

}
