package com.example.Londery_management.DTO;


import com.example.Londery_management.Models.Ordermodel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {


    private Long orderid;
    private Long customerid;
    private Long londerypackid;
    private BigDecimal totalAmount;
    private BigDecimal itemWeight;
    private String ordertype;
    private String orderState;
    private Date orderdata;

}



