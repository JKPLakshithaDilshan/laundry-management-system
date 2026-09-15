package com.example.Londery_management.Controllers;

import com.example.Londery_management.DTO.FeedbackDTO;
import com.example.Londery_management.DTO.FeedbackFullDTO;
import com.example.Londery_management.Services.FeedBackServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/API/V1/Feedback")
public class FeedbackController {

    @Autowired
    private FeedBackServices feedBackServices;

    @PostMapping("/createFeedback")
    public ResponseEntity<FeedbackDTO> createFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        try{
            System.out.println(feedbackDTO);
            FeedbackDTO savedFeedback = feedBackServices.createFeedback(feedbackDTO);
            return ResponseEntity.ok().body(savedFeedback);
        }catch (Exception e){
            throw  new RuntimeException(e.getMessage());
        }
    }

    @GetMapping("/get_allFeedbacks")
    public ResponseEntity<List<FeedbackFullDTO>> getAllFeedback() {
        try {
            List<FeedbackFullDTO> feedbackDTOs = feedBackServices.getAllFeedbackFull();
            return ResponseEntity.ok(feedbackDTOs);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch feedbacks: " + e.getMessage());
        }
    }


    @PutMapping("/update_feedback")
    public ResponseEntity<FeedbackDTO> updateFeedback(@RequestBody FeedbackDTO feedbackDTO) {
     try{
         FeedbackDTO savedFeedback = feedBackServices.updateFeedback(feedbackDTO);
         return ResponseEntity.ok().body(savedFeedback);
     }catch (Exception e){
         throw  new RuntimeException(e.getMessage());
     }
    }

    @DeleteMapping("/Delete_Feedback")
    public ResponseEntity<FeedbackDTO> deleteFeedback(@RequestParam Long feedbackID) {
        try{
            FeedbackDTO deleteFeedback = feedBackServices.deleteFeedback(feedbackID);
            return ResponseEntity.ok().body(deleteFeedback);
        }catch (Exception e){
            throw  new RuntimeException(e.getMessage());
        }
    }

    @GetMapping("/uniqueFeedbacks")
    public ResponseEntity<List<FeedbackDTO>> getFeedbackByCustomerId(@RequestParam Long customerId) {
        try{
            List<FeedbackDTO> allFeddbacks = feedBackServices.getUniqueFeedback(customerId);
            return ResponseEntity.ok(allFeddbacks);
        }catch (Exception e){
            throw  new RuntimeException(e.getMessage());
        }
    }
}
