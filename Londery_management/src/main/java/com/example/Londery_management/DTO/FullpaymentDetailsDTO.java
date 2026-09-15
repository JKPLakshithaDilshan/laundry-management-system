package com.example.Londery_management.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FullpaymentDetailsDTO {

    private Long paymentId;
    private String method;
    private BigDecimal amount;

    private Long id;
    private String phoneNumber;
    private String firstname;
    private String lastname;
    private String email;
    private String address;

    private Long orderid;
    private Long londerypackid;
    private BigDecimal totalAmount;
    private BigDecimal itemWeight;
    private String ordertype;
    private String orderState;
    private Date orderdata;
}
