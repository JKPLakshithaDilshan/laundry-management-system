package com.example.Londery_management.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FullIStoreItemDetailsDTO {


    private Long londeryStoreId;
    private String itemName;
    private String itemDescription;
    private String itemImageUrl;
    private BigDecimal itemPrice;
    private Integer itemQuantity;

    private Integer quantity;
    private BigDecimal totalPrice;
    private String orderType;


    private String phoneNumber;
    private String firstname;
    private String lastname;
    private String email;
    private String address;

    private String name;
    private String description;
    private String imageUrl;
    private BigDecimal price;
    private Integer Supplyquantity;
    private Long supplierId;
}
