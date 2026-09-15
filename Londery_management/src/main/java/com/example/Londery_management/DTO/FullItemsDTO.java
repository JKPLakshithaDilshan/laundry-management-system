package com.example.Londery_management.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FullItemsDTO {

    private Long itemId;
    private String name;
    private String description;
    private String imageUrl;
    private BigDecimal price;
    private Integer quantity;
    private Long supplierId;
    private String phoneNumber;
    private String firstname;
    private String lastname;
    private String email;
    private String address;
}
