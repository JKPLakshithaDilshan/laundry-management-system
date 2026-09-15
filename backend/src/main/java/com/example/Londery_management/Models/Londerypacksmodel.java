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
public class Londerypacksmodel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long londerypacksmodelId;

    @Column(nullable = false)
    private String packTitle;

    @Column(nullable = false)
    private String packDescription;

    @Column(nullable = false)
    private BigDecimal oneKGprice;

    @OneToMany(mappedBy = "londeryPack", cascade = CascadeType.ALL)
    private List<Ordermodel> orders;
}
