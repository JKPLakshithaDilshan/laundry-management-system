package com.example.Londery_management.Services;

import com.example.Londery_management.DTO.FullpaymentDetailsDTO;
import com.example.Londery_management.DTO.PaymentDTO;
import com.example.Londery_management.Models.Ordermodel;
import com.example.Londery_management.Models.Paymentmodel;
import com.example.Londery_management.Repo.OrderRepo;
import com.example.Londery_management.Repo.PaymentRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentsServices {

    @Autowired
    private PaymentRepo paymentRepo;

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private ModelMapper modelMapper;
    public PaymentDTO createPayment(PaymentDTO paymentDTO) {
        System.out.println(paymentDTO);
        Ordermodel order = orderRepo.findById(paymentDTO.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order Not Found"));

        // Map DTO to entity and save payment
        Paymentmodel payment = modelMapper.map(paymentDTO, Paymentmodel.class);
        payment.setOrder(order);
        Paymentmodel savedPayment = paymentRepo.save(payment);

        order.setPayment(savedPayment);
        orderRepo.save(order);

        // Return DTO of saved payment
        return modelMapper.map(savedPayment, PaymentDTO.class);
    }

   public List<FullpaymentDetailsDTO> getPaymentsByCustomerId(Long customerId) {

        List<Paymentmodel> uniquePayemt =  paymentRepo.findByOrder_Customer_Id(customerId);

        List<FullpaymentDetailsDTO> fullorderdetailsDTOS = new ArrayList<>();

        for (Paymentmodel payment : uniquePayemt) {
            FullpaymentDetailsDTO dto = new FullpaymentDetailsDTO();

            dto.setPaymentId(payment.getPaymentId());
            dto.setMethod(payment.getMethod().name());
            dto.setAmount(payment.getAmount());

            Ordermodel order = payment.getOrder();

            if (order != null) {
                dto.setOrderid(order.getOrderid());
                dto.setTotalAmount(order.getTotalAmount());
                dto.setItemWeight(order.getItemWeight());
                dto.setOrdertype(order.getOrdertype().name());
                dto.setOrderState(order.getOrderState().name());
                dto.setOrderdata(order.getOrderdata());

                // Londery pack info
                if (order.getLonderyPack() != null) {
                    dto.setLonderypackid(order.getLonderyPack().getLonderypacksmodelId());
                }

                // Customer info
                if (order.getCustomer() != null) {
                    dto.setId(order.getCustomer().getId());
                    dto.setFirstname(order.getCustomer().getFirstname());
                    dto.setLastname(order.getCustomer().getLastname());
                    dto.setEmail(order.getCustomer().getEmail());
                    dto.setPhoneNumber(order.getCustomer().getPhoneNumber());
                    dto.setAddress(order.getCustomer().getAddress());
                }
            }

            fullorderdetailsDTOS.add(modelMapper.map(dto, FullpaymentDetailsDTO.class));
        }

       return fullorderdetailsDTOS;
   }

    public List<FullpaymentDetailsDTO> showAllPayments() {
        List<Paymentmodel> payments = paymentRepo.findAll();

        List<FullpaymentDetailsDTO> paymentDetailsList = new ArrayList<>();

        for (Paymentmodel payment : payments) {
            FullpaymentDetailsDTO dto = new FullpaymentDetailsDTO();

            // Payment info
            dto.setPaymentId(payment.getPaymentId());
            dto.setMethod(payment.getMethod().name());
            dto.setAmount(payment.getAmount());

            // Order info
            Ordermodel order = payment.getOrder();
            if (order != null) {
                dto.setOrderid(order.getOrderid());
                dto.setTotalAmount(order.getTotalAmount());
                dto.setItemWeight(order.getItemWeight());
                dto.setOrdertype(order.getOrdertype().name());
                dto.setOrderState(order.getOrderState().name());
                dto.setOrderdata(order.getOrderdata());

                // Londery pack info
                if (order.getLonderyPack() != null) {
                    dto.setLonderypackid(order.getLonderyPack().getLonderypacksmodelId());
                }

                // Customer info
                if (order.getCustomer() != null) {
                    dto.setId(order.getCustomer().getId());
                    dto.setFirstname(order.getCustomer().getFirstname());
                    dto.setLastname(order.getCustomer().getLastname());
                    dto.setEmail(order.getCustomer().getEmail());
                    dto.setPhoneNumber(order.getCustomer().getPhoneNumber());
                    dto.setAddress(order.getCustomer().getAddress());
                }
            }

            paymentDetailsList.add(dto);
        }

        return paymentDetailsList;
    }

}
