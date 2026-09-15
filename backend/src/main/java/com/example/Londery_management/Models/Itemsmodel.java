package com.example.Londery_management.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Itemsmodel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    @Column(nullable = false)
    private String name;

    @Column (nullable = false)
    private String description;

    @Column ( nullable = false)
    private String imageUrl;

    @Column (nullable = false)
    private BigDecimal price;

    @Column (nullable = false)
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "supplierId", referencedColumnName = "id", nullable = false)
    private Usermodel supplier;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<ItemsOrdermodel> orders;

}
