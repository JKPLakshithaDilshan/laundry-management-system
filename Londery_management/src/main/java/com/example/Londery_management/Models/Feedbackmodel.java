package com.example.Londery_management.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Feedbackmodel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedBackID;

    @Column(nullable = false)
    private String feedbackMessage;

    @Column(nullable = false)
    private Integer rating;

    @ManyToOne
    @JoinColumn(name = "customerid", referencedColumnName = "id", nullable = false)
    private Usermodel customer;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "orderid", nullable = false)
    private Ordermodel order;
}
