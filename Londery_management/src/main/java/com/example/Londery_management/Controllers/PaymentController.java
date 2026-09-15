package com.example.Londery_management.Controllers;

import com.example.Londery_management.DTO.FullpaymentDetailsDTO;
import com.example.Londery_management.DTO.PaymentDTO;
import com.example.Londery_management.Services.PaymentsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/API/V1/payment")
public class PaymentController {

    @Autowired
    private PaymentsServices paymentsServices;

    @PostMapping("/createPayment")
    public ResponseEntity<?> createPayment(@RequestBody PaymentDTO paymentDTO){
        try{
            PaymentDTO createPay = paymentsServices.createPayment(paymentDTO);
            return ResponseEntity.ok(createPay);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/AllPayments")
    public ResponseEntity<List<FullpaymentDetailsDTO>> showAllPayments(){
        try{
            List<FullpaymentDetailsDTO> fullpaymentDetails = paymentsServices.showAllPayments();
             return ResponseEntity.ok(fullpaymentDetails);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/uniquePayment")
    public ResponseEntity<?> showUniquePayments(@RequestParam Long customerId){
        try{
             List<FullpaymentDetailsDTO> allPayments = paymentsServices.getPaymentsByCustomerId(customerId);
             return ResponseEntity.ok(allPayments);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }


}
