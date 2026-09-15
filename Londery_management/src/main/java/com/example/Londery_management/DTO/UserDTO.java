package com.example.Londery_management.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Long id;
    private String phoneNumber;
    private String firstname;
    private String lastname;
    private String email;
    private String address;
    private String password;
    private String role;
}
