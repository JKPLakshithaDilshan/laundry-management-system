package com.example.Londery_management.Services;

import com.example.Londery_management.DTO.DeleveryRatingDTO;
import com.example.Londery_management.DTO.FullDataRatingDetailsDTO;
import com.example.Londery_management.Models.DeleveryRatingmodel;
import com.example.Londery_management.Models.Ordermodel;
import com.example.Londery_management.Repo.DelevaryRatingRepo;
import com.example.Londery_management.Repo.OrderRepo;
import org.aspectj.weaver.ast.Or;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DelevaryRatingServices {

    @Autowired
    private DelevaryRatingRepo delevaryRatingRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private OrderRepo  orderRepo;

    public DeleveryRatingDTO createRating(DeleveryRatingDTO deleveryRatingDTO) {
        Ordermodel findOrder = orderRepo.findById(deleveryRatingDTO.getOrderId()).orElse(null);
        if (findOrder == null) {
            throw  new RuntimeException("Order not found");
        }
        DeleveryRatingmodel createrating = modelMapper.map(deleveryRatingDTO, DeleveryRatingmodel.class);
        DeleveryRatingmodel savedRating = delevaryRatingRepo.save(createrating);

        return modelMapper.map(savedRating,DeleveryRatingDTO.class);
    }

    public List<FullDataRatingDetailsDTO> getAllRatings() {


        List<DeleveryRatingmodel> ratings = delevaryRatingRepo.findAll();


        return ratings.stream().map(rating -> {
            FullDataRatingDetailsDTO dto = new FullDataRatingDetailsDTO();


            dto.setDeleveryRatingId(rating.getDeleveryRatingId());
            dto.setRating(rating.getRating());
            dto.setComment(rating.getComment());
            dto.setRatingDate(rating.getRatingDate());


            Ordermodel order = rating.getOrder();
            if (order != null) {
                dto.setOrderid(order.getOrderid());
                dto.setTotalAmount(order.getTotalAmount());
                dto.setItemWeight(order.getItemWeight());
                dto.setOrdertype(String.valueOf(order.getOrdertype()));
                dto.setOrderState(String.valueOf(order.getOrderState()));
                dto.setOrderdata(order.getOrderdata());


                if (order.getLonderyPack() != null) {
                    dto.setLonderypackid(order.getLonderyPack().getLonderypacksmodelId());
                }


                if (order.getCustomer() != null) {
                    dto.setCustomerid(order.getCustomer().getId());
                    dto.setFirstname(order.getCustomer().getFirstname());
                    dto.setLastname(order.getCustomer().getLastname());
                    dto.setPhoneNumber(order.getCustomer().getPhoneNumber());
                    dto.setEmail(order.getCustomer().getEmail());
                    dto.setAddress(order.getCustomer().getAddress());
                }
            }

            return dto;
        }).collect(Collectors.toList());
    }

    public String deleteRating(Long ratingId) {
        DeleveryRatingmodel existingRating = delevaryRatingRepo.findById(ratingId)
                .orElseThrow(() -> new RuntimeException("Rating not found with ID: " + ratingId));


        if (existingRating.getOrder() != null) {
            existingRating.getOrder().setDeliveryRating(null);
        }

        delevaryRatingRepo.delete(existingRating);

        return "Rating with ID " + ratingId + " deleted successfully.";
    }

    public DeleveryRatingDTO updateRating(DeleveryRatingDTO updatedDTO) {
        DeleveryRatingmodel existingRating = delevaryRatingRepo.findById(updatedDTO.getDeleveryRatingId())
                .orElseThrow(() -> new RuntimeException("Rating not found with ID: " + updatedDTO.getDeleveryRatingId()));


        existingRating.setRating(updatedDTO.getRating());
        existingRating.setComment(updatedDTO.getComment());


        if (updatedDTO.getOrderId() != null) {
            Ordermodel order = orderRepo.findById(updatedDTO.getOrderId())
                    .orElseThrow(() -> new RuntimeException("Order not found with ID: " + updatedDTO.getOrderId()));
            existingRating.setOrder(order);
        }

        DeleveryRatingmodel saved = delevaryRatingRepo.save(existingRating);
        return modelMapper.map(saved, DeleveryRatingDTO.class);
    }

    public List<FullDataRatingDetailsDTO> getRatingsByCustomerId(Long customerId) {
        List<DeleveryRatingmodel> ratings = delevaryRatingRepo.findAll().stream()
                .filter(rating -> rating.getOrder() != null &&
                        rating.getOrder().getCustomer() != null &&
                        rating.getOrder().getCustomer().getId().equals(customerId))
                .collect(Collectors.toList());

        return ratings.stream().map(rating -> {
            FullDataRatingDetailsDTO dto = new FullDataRatingDetailsDTO();
            dto.setDeleveryRatingId(rating.getDeleveryRatingId());
            dto.setRating(rating.getRating());
            dto.setComment(rating.getComment());
            dto.setRatingDate(rating.getRatingDate());

            Ordermodel order = rating.getOrder();
            if (order != null) {
                dto.setOrderid(order.getOrderid());
                dto.setTotalAmount(order.getTotalAmount());
                dto.setItemWeight(order.getItemWeight());
                dto.setOrdertype(String.valueOf(order.getOrdertype()));
                dto.setOrderState(String.valueOf(order.getOrderState()));
                dto.setOrderdata(order.getOrderdata());
            }

            dto.setCustomerid(order.getCustomer().getId());
            dto.setFirstname(order.getCustomer().getFirstname());
            dto.setLastname(order.getCustomer().getLastname());
            dto.setPhoneNumber(order.getCustomer().getPhoneNumber());
            dto.setEmail(order.getCustomer().getEmail());
            dto.setAddress(order.getCustomer().getAddress());
            dto.setLonderypackid(order.getLonderyPack().getLonderypacksmodelId());

            return dto;
        }).collect(Collectors.toList());
    }
}
