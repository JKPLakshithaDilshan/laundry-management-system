package com.example.Londery_management.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackDTO {
    private Long feedBackID;
    private String feedbackMessage;
    private Integer rating;
    private Long customerID;
    private Long orderID;
}
