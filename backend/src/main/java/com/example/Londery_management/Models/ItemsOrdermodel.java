package com.example.Londery_management.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemsOrdermodel {


    public enum  orderType{REQUEST,CONFORMED}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ItemsOrderId;

    @Column (nullable = false)
    private Integer Quantity;

    @Column(nullable = false)
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    @Column (nullable = false)
    private orderType orderType;

    @ManyToOne
    @JoinColumn(name = "itemId", referencedColumnName = "itemId", nullable = false)
    private Itemsmodel item;

    @ManyToOne
    @JoinColumn(name = "supplierId", referencedColumnName = "id", nullable = false)
    private Usermodel supplier;


}
