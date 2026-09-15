package com.example.Londery_management.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Paymentmodel {

    public enum Method { CASH_ON_DELIVERY, CARD, MOBILE_WALLET }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Method method;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @OneToOne
    @JoinColumn(name = "orderid", referencedColumnName = "orderid", nullable = false)
    private Ordermodel order;
}
