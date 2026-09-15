package com.example.Londery_management.DTO;

import com.example.Londery_management.Models.Ordermodel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeleveryRatingDTO {

    private Long deleveryRatingId;
    private int rating;
    private String comment;
    private Date ratingDate = new Date();
    private Long orderId;
}
