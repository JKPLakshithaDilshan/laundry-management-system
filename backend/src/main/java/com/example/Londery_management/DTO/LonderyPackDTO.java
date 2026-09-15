package com.example.Londery_management.DTO;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LonderyPackDTO {

    private Long londerypacksmodelId;
    private String packTitle;
    private String packDescription;
    private BigDecimal oneKGprice;
}
