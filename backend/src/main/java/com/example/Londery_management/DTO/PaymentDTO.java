package com.example.Londery_management.DTO;

import com.example.Londery_management.Models.Ordermodel;
import com.example.Londery_management.Models.Paymentmodel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO {

    private Long paymentId;
    private String method;
    private BigDecimal amount;
    private Long orderId;
}
