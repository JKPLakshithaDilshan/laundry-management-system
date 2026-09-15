package com.example.Londery_management.Services;


import com.example.Londery_management.DTO.UserDTO;
import com.example.Londery_management.EmailHandle.EmailDTO;
import com.example.Londery_management.EmailHandle.EmailServices;
import com.example.Londery_management.Models.Usermodel;
import com.example.Londery_management.Repo.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServices {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private EmailServices emailServices;


    public UserDTO createAdmin(String Email){
        Usermodel find_user = userRepo.findByEmail(Email).orElse(null);
        if(find_user == null){
            throw new RuntimeException("User not found");
        }
        find_user.setRole("Admin");
        userRepo.save(find_user);

        EmailDTO emailDTO = new EmailDTO();
        emailDTO.setReceiver(Email);
        emailDTO.setSubject("Admin Access grant");
        emailDTO.setBody("Congratulations Now you are Admin");

        emailServices.sendEmail(emailDTO);

        return (modelMapper.map(find_user, UserDTO.class));
    }

    public UserDTO removeUser(String Email){
        Usermodel find_user = userRepo.findByEmail(Email).orElse(null);
        if(find_user == null){
            throw new RuntimeException("User not found");
        }
        if(find_user.getRole().equals("Admin")){
            throw new RuntimeException("Admin role can't Remove");
        }
        userRepo.delete(find_user);

        EmailDTO emailDTO = new EmailDTO();
        emailDTO.setReceiver(Email);
        emailDTO.setSubject("You have been removed");
        emailDTO.setBody("You have been removed");

        emailServices.sendEmail(emailDTO);

        return (modelMapper.map(find_user, UserDTO.class));
    }

    public List<UserDTO> getAllUsers() {
        List<Usermodel> fullUsers = userRepo.findAll();
        return fullUsers.stream().map(user -> new UserDTO(
                user.getId(),
                user.getPhoneNumber(),
                user.getFirstname(),
                user.getLastname(),
                user.getEmail(),
                user.getAddress(),
                user.getPassword(),
                user.getRole()
        )).collect(Collectors
                .toList());
    }

}
