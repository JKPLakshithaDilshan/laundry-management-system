package com.example.Londery_management.Repo;

import com.example.Londery_management.Models.Feedbackmodel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedbackmodel,Long> {
    List<Feedbackmodel> findByCustomer_Id(Long customerId);


}
