package com.example.Londery_management.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StoreDTO {

    private Long londeryStoreId;
    private String itemName;
    private String itemDescription;
    private String itemImageUrl;
    private BigDecimal itemPrice;
    private Integer itemQuantity;
}
