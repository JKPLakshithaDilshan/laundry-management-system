package com.example.Londery_management.Controllers;

import com.example.Londery_management.DTO.UserDTO;
import com.example.Londery_management.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/API/V1/User")
public class UserController {

    @Autowired
    private UserServices userServices;

    @PostMapping("/Register")
    public ResponseEntity<?> Register(@RequestBody UserDTO userDTO) {
        try{
             UserDTO newUser = userServices.createUser(userDTO);
             return ResponseEntity.ok().body(newUser);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/Login")
    public ResponseEntity<?> Login(@RequestParam String email, @RequestParam String password) {
        try{
            UserDTO registerUser = userServices.loginUser(email,password);
            return ResponseEntity.ok().body(registerUser);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/Updater_User")
    public ResponseEntity<?> UpdateUser(@RequestBody UserDTO userDTO) {
        try{
            UserDTO updateUser = userServices.updateUser(userDTO);
            return ResponseEntity.ok().body(updateUser);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/verify_User")
    public ResponseEntity<?> verifyUser(@RequestParam String email) {
        try{
            String verifyUser = userServices.verifyUser(email);
            return ResponseEntity.ok().body(verifyUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
