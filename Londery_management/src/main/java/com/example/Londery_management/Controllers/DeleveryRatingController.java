package com.example.Londery_management.Controllers;

import com.example.Londery_management.DTO.DeleveryRatingDTO;
import com.example.Londery_management.DTO.FullDataRatingDetailsDTO;
import com.example.Londery_management.Services.DelevaryRatingServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/API/V1/DevRating")
public class DeleveryRatingController {


    @Autowired
    private DelevaryRatingServices delevaryRatingServices;

    @PostMapping("/createRating")
    public ResponseEntity<?> getDeleverRatingById(@RequestBody DeleveryRatingDTO deleverRatingDTO) {
        try{
            DeleveryRatingDTO createRatings = delevaryRatingServices.createRating(deleverRatingDTO);
            return ResponseEntity.ok(createRatings);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getAllratings")
    public ResponseEntity<?> getAllRatings(){
        try{
            List<FullDataRatingDetailsDTO> findAllRatings = delevaryRatingServices.getAllRatings();
            return ResponseEntity.ok(findAllRatings);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/updateRatings")
    public ResponseEntity<?> updateRatings(@RequestBody  DeleveryRatingDTO deleverRatingDTO) {
        try{
            DeleveryRatingDTO updateRatings = delevaryRatingServices.updateRating(deleverRatingDTO);
            return ResponseEntity.ok(updateRatings);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/deleteRaings")
    public ResponseEntity<?> deleteRatings(@RequestParam Long id) {
        try{
            String ratingDetele = delevaryRatingServices.deleteRating(id);
            return ResponseEntity.ok(ratingDetele);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getUniqulyRatings")
    public ResponseEntity<?> getUniqulyRatings(@RequestParam Long customerId) {
        try{
            List<FullDataRatingDetailsDTO> allDetails = delevaryRatingServices.getRatingsByCustomerId(customerId);
            return ResponseEntity.ok(allDetails);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
