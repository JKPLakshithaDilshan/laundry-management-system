package com.example.Londery_management.Controllers;

import com.example.Londery_management.DTO.FullIStoreItemDetailsDTO;
import com.example.Londery_management.DTO.FullItemOrderDetailsDTO;
import com.example.Londery_management.DTO.ItemOrderDTO;
import com.example.Londery_management.DTO.StoreDTO;
import com.example.Londery_management.Services.ItemOrderServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/API/V1/ItemOrder")
public class ItemOrderController {

    @Autowired
    private ItemOrderServices  itemOrderServices;

    @PostMapping("/createItemOrder")
    public ResponseEntity<ItemOrderDTO> createItemOrder(@RequestBody ItemOrderDTO itemOrderDTO){
        try{
            ItemOrderDTO getOrders = itemOrderServices.createOrder(itemOrderDTO);
            return ResponseEntity.ok(getOrders);
        }catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/AllItemsOrders")
    public ResponseEntity<?> getAllItemOrders(@RequestParam Long supplierId){
        try{
            List<FullItemOrderDetailsDTO> allOrders = itemOrderServices.getAllOrdersBySupplierId(supplierId);
            return ResponseEntity.ok(allOrders);
        }catch (Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/changeStates")
    public ResponseEntity<?> changeStatesOForder(@RequestParam Long IteOrderId){
        try{
            String Order_States = itemOrderServices.confirmOrder(IteOrderId);
            return ResponseEntity.ok(Order_States);
        }catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/CanselItemOrder")
    public ResponseEntity<?> canselOrder(@RequestParam Long IteOrderId){
        try{
            String Order_States = itemOrderServices.cancelOrder(IteOrderId);
            return ResponseEntity.ok(Order_States);
        }catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/AllStoreItems")
    public ResponseEntity<?> getallStoreItems(){
        try {
           List<FullIStoreItemDetailsDTO> allStoreItems = itemOrderServices.getAllStoreItems();
            return ResponseEntity.ok(allStoreItems);
        }catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/AllorderNotConformd")
    public ResponseEntity<?> getallorderNotConformd(){
        try{
            List<FullItemOrderDetailsDTO> allRequests = itemOrderServices.getAllOrders();
            return ResponseEntity.ok(allRequests);
        }catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/UpdateQuantity")
    public ResponseEntity<?> updateQuantity(@RequestParam Long IteOrderId, @RequestParam Integer quantity, @RequestParam BigDecimal totalPrice){
        try{
            String updateMesage = itemOrderServices.updateItemCount(IteOrderId, totalPrice, quantity);
            return ResponseEntity.ok(updateMesage);
        }catch (Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }


}
