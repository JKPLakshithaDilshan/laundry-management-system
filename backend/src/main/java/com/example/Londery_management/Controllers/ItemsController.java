package com.example.Londery_management.Controllers;

import com.example.Londery_management.DTO.FullItemsDTO;
import com.example.Londery_management.DTO.ItemDTO;
import com.example.Londery_management.Services.ItemsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/API/V1/Item")
public class ItemsController {

    @Autowired
    private ItemsServices itemsServices;

    @PostMapping("/AddItems")
    public ResponseEntity<?> addItem(@RequestBody ItemDTO itemDTO){
        try{
            ItemDTO itemsadd = itemsServices.supplyItems(itemDTO);
            return ResponseEntity.ok(itemsadd);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/AllItems")
    public ResponseEntity<List<FullItemsDTO>> getAllItems(){
        try{
            List<FullItemsDTO> allItems = itemsServices.getSupplyItems();
            return ResponseEntity.ok(allItems);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/updateItems")
    public ResponseEntity<?> updateItem(@RequestBody ItemDTO itemDTO){
        try{
            ItemDTO itemsupdate = itemsServices.updateItem(itemDTO);
            return ResponseEntity.ok(itemsupdate);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/uniquelyGet")
    public ResponseEntity<List<ItemDTO>> getItemsBySupplierId(@RequestParam Long supplierId){
        try{
            List<ItemDTO> getItems = itemsServices.getUiquelyItems(supplierId);
            return ResponseEntity.ok(getItems);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/deleteItems")
    public ResponseEntity<?> deleteItem(@RequestParam Long itemId, @RequestParam Long supplierId) {
        try {
           ItemDTO itemsdelete = itemsServices.deleteItem(itemId, supplierId);
           return ResponseEntity.ok(itemsdelete);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
