package com.example.Londery_management.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FullorderdetailsDTO {

    // Enums must match Ordermodel enums
//    public enum OrderType { STORE_PICKUP, DELIVERY }
//    public enum Status { PICKUP, CLEANING, DELIVERY, COMPLETED, CANCELLED }

    private Long orderid;
    private Date orderdata;
    private BigDecimal totalAmount;
    private BigDecimal itemWeight;
    private Long customerid;
    private String orderState;
    private String orderType;

    // Customer details
    private String firstname;
    private String lastname;
    private String email;
    private String phoneNumber;
    private String address;

    private String packTitle;
    private String packDescription;
    private BigDecimal oneKGprice;


}
