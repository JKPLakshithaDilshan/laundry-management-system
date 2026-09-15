package com.example.Londery_management.Controllers;

import com.example.Londery_management.DTO.FullpaymentDetailsDTO;
import com.example.Londery_management.DTO.OrderDTO;
import com.example.Londery_management.Services.DeleveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/API/V1/Delevery")
@RestController
public class DeleveryContorller {

    @Autowired
    private DeleveryService delevery;

    @GetMapping("/showDelevry")
    public ResponseEntity<List<FullpaymentDetailsDTO>> showDelevry() {
        try{
            List<FullpaymentDetailsDTO> fulldata = delevery.showDelivery();
            return new ResponseEntity<>(fulldata, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateStates")
    public ResponseEntity<FullpaymentDetailsDTO> updateStates(@RequestParam Long id , @RequestParam String orderstate) {
        try{
            FullpaymentDetailsDTO fulldata = delevery.changeStatus(id,orderstate);
            return new ResponseEntity<>(fulldata, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping("/delteOrders")
    public ResponseEntity<?> deleteOrders(@RequestParam Long orderid) {
        try {
            OrderDTO orderDetails = delevery.deleteCompleteOrder(orderid);
            return ResponseEntity.ok(orderDetails);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/CreateCustomerMesage")
    public ResponseEntity<?> createMessage(@RequestBody FullpaymentDetailsDTO fullpaymentDetails) {
        try{
            String message = delevery.sendEmailToCustomer(fullpaymentDetails);
            return new ResponseEntity<>(message, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
