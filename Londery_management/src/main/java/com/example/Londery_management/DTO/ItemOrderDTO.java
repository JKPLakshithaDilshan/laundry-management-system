package com.example.Londery_management.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemOrderDTO {

    private Long itemsOrderId;
    private Integer quantity;
    private BigDecimal totalPrice;
    private String orderType;
    private Long itemId;
    private Long supplierId;

}
