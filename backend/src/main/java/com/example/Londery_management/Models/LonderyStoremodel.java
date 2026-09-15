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
public class LonderyStoremodel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long londeryStoreId;

    @Column(nullable = false)
    private String itemName;

    @Column (nullable = false)
    private String itemDescription;

    @Column ( nullable = false)
    private String itemImageUrl;

    @Column (nullable = false)
    private BigDecimal itemPrice;

    @Column (nullable = false)
    private Integer itemQuantity;

    @ManyToOne
    @JoinColumn(name = "supplierId", referencedColumnName = "id", nullable = false)
    private Usermodel supplier;

    @OneToOne
    @JoinColumn(name = "orderId", referencedColumnName = "itemsOrderId")
    private ItemsOrdermodel sourceOrder;
}
