package com.example.Londery_management.Controllers;

import com.example.Londery_management.DTO.UserDTO;
import com.example.Londery_management.Services.AdminServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/API/V1/Admin")
public class Admincontroller {

    @Autowired
    private AdminServices adminServices;

    @PutMapping("/CreateAdmin")
    public ResponseEntity<?> createAdmin(@RequestParam String Email){
        try{
            UserDTO user = adminServices.createAdmin(Email);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
          throw new RuntimeException(e.getMessage());
        }
    }

    @DeleteMapping("/RemoveUser")
    public ResponseEntity<?> removeUser(@RequestParam String Email){
        try{
            UserDTO user = adminServices.removeUser(Email);
            return ResponseEntity.ok(user);
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @GetMapping("/Allusers")
    public ResponseEntity<?> getAllUsers(){
        try{
            List<UserDTO> users = adminServices.getAllUsers();
            return ResponseEntity.ok(users);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

}
