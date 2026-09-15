package com.example.Londery_management.Repo;

import com.example.Londery_management.Models.Ordermodel;
import com.example.Londery_management.Models.Paymentmodel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepo extends JpaRepository<Paymentmodel, Long> {
    boolean existsByOrder(Ordermodel order);
    List<Paymentmodel> findByOrder_Customer_Id(Long customerId);


}
