package com.example.Londery_management.Services;

import com.example.Londery_management.DTO.FeedbackDTO;
import com.example.Londery_management.DTO.FeedbackFullDTO;
import com.example.Londery_management.Models.Feedbackmodel;
import com.example.Londery_management.Models.Usermodel;
import com.example.Londery_management.Repo.FeedbackRepo;
import com.example.Londery_management.Repo.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedBackServices {

    @Autowired
    private FeedbackRepo feedbackRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepo userRepo;

    public FeedbackDTO createFeedback(FeedbackDTO feedbackDTO) {

        Usermodel customer = userRepo.findById(feedbackDTO.getCustomerID())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        if( customer != null ) {
        Feedbackmodel addFeedback = modelMapper.map(feedbackDTO, Feedbackmodel.class);
        Feedbackmodel savedFeedback = feedbackRepo.save(addFeedback);
        return modelMapper.map(savedFeedback, FeedbackDTO.class);

        }
        throw new RuntimeException("Customer not found");
    }


    public List<FeedbackFullDTO>  getAllFeedbackFull() {
        List<Feedbackmodel> feedbacks = feedbackRepo.findAll();
         return feedbacks.stream()
                 .map(feedback -> {
                     FeedbackFullDTO  Fdto = new FeedbackFullDTO();

                     Fdto.setFeedBackID(feedback.getFeedBackID());
                     Fdto.setFeedbackMessage(feedback.getFeedbackMessage());
                     Fdto.setRating(feedback.getRating());
                     Fdto.setCustomerid(feedback.getCustomer().getId());
                     Fdto.setOrderID(feedback.getOrder().getOrderid());

                     Fdto.setEmail(feedback.getCustomer().getEmail());
                     Fdto.setAddress(feedback.getCustomer().getAddress());
                     Fdto.setFirstname(feedback.getCustomer().getFirstname());
                     Fdto.setLastname(feedback.getCustomer().getLastname());
                     Fdto.setPhoneNumber(feedback.getCustomer().getPhoneNumber());

                     Fdto.setOrderdata(feedback.getOrder().getOrderdata());
                     Fdto.setOrderState(String.valueOf(feedback.getOrder().getOrderState()));
                     Fdto.setOrdertype(String.valueOf(feedback.getOrder().getOrdertype()));
                     Fdto.setTotalAmount(feedback.getOrder().getTotalAmount());
                     Fdto.setItemWeight(feedback.getOrder().getItemWeight());

                     return Fdto;
                         }).collect(Collectors.toList());

    }

    public FeedbackDTO updateFeedback(FeedbackDTO feedbackDTO) {
        Feedbackmodel findfeedback = feedbackRepo.findById(feedbackDTO.getFeedBackID())
                .orElseThrow(() -> new RuntimeException("Feedback not found"));
        findfeedback.setFeedbackMessage(feedbackDTO.getFeedbackMessage());
        findfeedback.setRating(feedbackDTO.getRating());
        feedbackRepo.save(findfeedback);
        return modelMapper.map(findfeedback, FeedbackDTO.class);
    }

    public FeedbackDTO deleteFeedback(Long feedbackID) {
        Feedbackmodel findFeedback = feedbackRepo.findById(feedbackID).orElseThrow(() ->
                new RuntimeException("Feedback not found"));
        feedbackRepo.delete(findFeedback);
        return modelMapper.map(findFeedback, FeedbackDTO.class);
    }

    public List<FeedbackDTO> getUniqueFeedback(Long CustomerID) {
         List<Feedbackmodel> allFeedbacks = feedbackRepo.findByCustomer_Id(CustomerID);

         if( allFeedbacks.isEmpty() ) {
             throw new RuntimeException("Feedback not found");
         }
         return allFeedbacks.stream().map(feedback ->
                 modelMapper.map(feedback, FeedbackDTO.class))
                 .collect(Collectors
                         .toList());
    }
}

