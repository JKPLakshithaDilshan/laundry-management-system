package com.example.Londery_management.Services;

import com.example.Londery_management.DTO.UserDTO;
import com.example.Londery_management.EmailHandle.EmailDTO;
import com.example.Londery_management.EmailHandle.EmailServices;
import com.example.Londery_management.Models.Usermodel;
import com.example.Londery_management.Repo.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserServices {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private EmailServices emailServices;


    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    public UserDTO createUser(UserDTO userDTO) {

        Usermodel oldUser = userRepo.findByEmail(userDTO.getEmail()).orElse(null);

      if (oldUser != null) {
         throw  new RuntimeException("User with email"+ oldUser.getEmail() +"  already exists");
      }
       userDTO.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
       Usermodel newUser = modelMapper.map(userDTO, Usermodel.class);
       Usermodel savesUser = userRepo.save(newUser);

        String verifyLink = "http://localhost:5173/verify?email=" + userDTO.getEmail();

        EmailDTO  emailDTO = new EmailDTO();
        emailDTO.setReceiver(userDTO.getEmail());
        emailDTO.setSubject("Welcome to our Londoner Services");
        emailDTO.setBody(
                "Dear " + userDTO.getFirstname() + " " + userDTO.getLastname() + ",<br><br>" +
                        "Thank you for registering with Our System.<br><br>" +
                        "<a href='" + verifyLink + "' " +
                        "style='display:inline-block; padding:10px 20px; font-size:16px; color:#ffffff; background-color:#007BFF; " +
                        "text-decoration:none; border-radius:5px;'>Login Now</a><br><br>" +
                        "Best regards,<br>" +
                        "<strong>Londoner Team</strong>"
        );
        emailServices.sendEmail(emailDTO);

       return modelMapper.map(savesUser, UserDTO.class);

    }

    public UserDTO loginUser(String email, String password) {
         Usermodel oldUser = userRepo.findByEmail(email).orElse(null);

         if(oldUser == null){
             throw  new RuntimeException("User with email"+ oldUser.getEmail() +"  not found");
         }
        if(oldUser.getActive() == false){
            throw  new RuntimeException("Please check your email and verify your email");
        }

         if(bCryptPasswordEncoder.matches(password,oldUser.getPassword())){
             return modelMapper.map(oldUser,UserDTO.class);
         }else {
             throw new RuntimeException("Wrong password");
         }

    }

    public  String verifyUser(String email){
        Usermodel oldUser = userRepo.findByEmail(email).orElse(null);
        if(oldUser == null){
            throw  new RuntimeException("User with email"+ oldUser.getEmail() +"  not found");
        }
        oldUser.setActive(true);
        userRepo.save(oldUser);
        return "Verified your account";
    }

    public UserDTO updateUser(UserDTO userDTO) {
        Usermodel oldUser = userRepo.findByEmail(userDTO.getEmail()).orElse(null);
        if (oldUser == null) {
            throw  new RuntimeException("User with email"+ oldUser.getEmail() +"  not found");
        }
        oldUser.setEmail(userDTO.getEmail());
        oldUser.setAddress(userDTO.getAddress());
        oldUser.setFirstname(userDTO.getFirstname());
        oldUser.setLastname(userDTO.getLastname());
        oldUser.setPhoneNumber(String.valueOf(userDTO.getPhoneNumber()));

        userRepo.save(oldUser);
        return modelMapper.map(oldUser,UserDTO.class);

    }


}
