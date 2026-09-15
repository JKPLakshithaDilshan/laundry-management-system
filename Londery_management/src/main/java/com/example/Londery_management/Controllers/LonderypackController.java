package com.example.Londery_management.Controllers;


import com.example.Londery_management.DTO.LonderyPackDTO;
import com.example.Londery_management.Services.LonderyPackServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/API/V1/LondonerPack")
public class LonderypackController {


    @Autowired
    private LonderyPackServices londeryPackServices;

    @PostMapping("/AddLonderyPack")
    public ResponseEntity<?> addLonderyPack(@RequestBody LonderyPackDTO londeryPackDTO) {
        try{
            LonderyPackDTO  londeryDTO = londeryPackServices.createLonderyPack(londeryPackDTO);
            return ResponseEntity.ok(londeryDTO);
        } catch (Exception e) {
             return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getAllpacks")
    public ResponseEntity<List<LonderyPackDTO>> getAllpacks() {
        try{
            List<LonderyPackDTO> allpacks = londeryPackServices.getallpacks();
            return ResponseEntity.ok(allpacks);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/updatePacks")
    public ResponseEntity<?> updatePack(@RequestBody LonderyPackDTO londeryPackDTO) {
        try{
            LonderyPackDTO findpacks = londeryPackServices.updatepack(londeryPackDTO);
            return ResponseEntity.ok(findpacks);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/deletePacks")
    public ResponseEntity<?> deletePack(@RequestParam Long id) {
        try{
            LonderyPackDTO findpacks = londeryPackServices.deletepack(id);
            return ResponseEntity.ok(findpacks);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
