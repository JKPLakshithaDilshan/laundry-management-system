package com.example.Londery_management.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "delivery_ratings")
public class DeleveryRatingmodel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deleveryRatingId;

    @Column(nullable = false)
    private int rating;

    @Column(length = 500)
    private String comment;

    @Temporal(TemporalType.TIMESTAMP)
    private Date ratingDate = new Date();

    @OneToOne
    @JoinColumn(name = "order_id", referencedColumnName = "orderid", nullable = false)
    private Ordermodel order;

}
