package com.example.Londery_management.Repo;


import com.example.Londery_management.Models.Ordermodel;
import com.example.Londery_management.Models.Usermodel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepo extends JpaRepository<Ordermodel, Long> {
    Optional<Ordermodel> findByCustomer(Usermodel customer);
    List<Ordermodel> findByCustomer_Id(Long customerId);
    List<Ordermodel> findByOrderState(Ordermodel.Status orderState);

    List<Ordermodel> findByOrdertype(Ordermodel.orderType orderType);
}


