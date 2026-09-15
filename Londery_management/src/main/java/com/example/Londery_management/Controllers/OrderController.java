package com.example.Londery_management.Controllers;

import com.example.Londery_management.DTO.FullorderdetailsDTO;
import com.example.Londery_management.DTO.OrderDTO;
import com.example.Londery_management.Services.OrderServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/API/V1/Order")
public class OrderController {

    @Autowired
    private OrderServices orderServices;

    @PostMapping("/createorder")
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderDTO){
        try{
            OrderDTO fullorderdetailsDTO = orderServices.createOrder(orderDTO);
            return ResponseEntity.ok().body(fullorderdetailsDTO);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/Allorders")
    public ResponseEntity<?> getAllOrders(){
        try{
            List<FullorderdetailsDTO> allOrders = orderServices.getOrderdetails();
            return ResponseEntity.ok().body(allOrders);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/updateOrder")
    public ResponseEntity<?> updateOrder(@RequestBody OrderDTO orderDTO) {
        try {
            OrderDTO updatedOrderDTO = orderServices.updateOrder(orderDTO);
            return ResponseEntity.ok(updatedOrderDTO);
        } catch (RuntimeException e) {
            // Return 404 if the order does not exist
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            // For any other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the order");
        }
    }

    @DeleteMapping("/deleteOrder")
    public ResponseEntity<?> deleteOrder(@RequestParam Long id) {
        try{
            OrderDTO updatedOrderDTO = orderServices.deleteOrder(id);
            return ResponseEntity.ok(updatedOrderDTO);
        }catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/uniqueOrders")
    public ResponseEntity<?> getUniqueOrders(@RequestParam Long id){
        try{
            List<FullorderdetailsDTO> allorders = orderServices.sendOrderUnique(id);
            return ResponseEntity.ok(allorders);
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/fullorderDetails")
    public ResponseEntity<?> getFullordrdetails(){
        try{
            List<FullorderdetailsDTO> all_Orders = orderServices.getFullorders();
            return ResponseEntity.ok(all_Orders);
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
