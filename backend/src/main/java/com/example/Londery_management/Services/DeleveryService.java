package com.example.Londery_management.Services;

import com.example.Londery_management.DTO.FullpaymentDetailsDTO;
import com.example.Londery_management.DTO.OrderDTO;
import com.example.Londery_management.EmailHandle.EmailDTO;
import com.example.Londery_management.EmailHandle.EmailServices;
import com.example.Londery_management.Models.Ordermodel;
import com.example.Londery_management.Models.Paymentmodel;
import com.example.Londery_management.Models.Usermodel;
import com.example.Londery_management.Repo.OrderRepo;
import com.example.Londery_management.Repo.PaymentRepo;
import com.example.Londery_management.Repo.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DeleveryService {

    @Autowired
    private PaymentRepo paymentRepo;

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private ModelMapper  modelMapper;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private EmailServices  emailServices;

    public List<FullpaymentDetailsDTO> showDelivery() {
        List<Ordermodel> deliveryOrders = orderRepo.findByOrdertype(Ordermodel.orderType.DELIVERY);
        List<FullpaymentDetailsDTO> result = new ArrayList<>();

        for (Ordermodel order : deliveryOrders) {
            Paymentmodel payment = order.getPayment();
            if (payment != null) {
                FullpaymentDetailsDTO dto = new FullpaymentDetailsDTO();


                dto.setPaymentId(payment.getPaymentId());
                dto.setAmount(payment.getAmount());
                dto.setMethod(payment.getMethod().name());


                dto.setOrderid(order.getOrderid());
                dto.setTotalAmount(order.getTotalAmount());
                dto.setItemWeight(order.getItemWeight());
                dto.setOrdertype(order.getOrdertype().name());
                dto.setOrderState(order.getOrderState().name());
                dto.setOrderdata(order.getOrderdata());


                if (order.getCustomer() != null) {
                    dto.setId(order.getCustomer().getId());
                    dto.setFirstname(order.getCustomer().getFirstname());
                    dto.setLastname(order.getCustomer().getLastname());
                    dto.setEmail(order.getCustomer().getEmail());
                    dto.setPhoneNumber(order.getCustomer().getPhoneNumber());
                    dto.setAddress(order.getCustomer().getAddress());
                }


                if (order.getLonderyPack() != null) {
                    dto.setLonderypackid(order.getLonderyPack().getLonderypacksmodelId());
                }

                result.add(dto);
            }
        }

        return result;
    }

    public FullpaymentDetailsDTO changeStatus(Long orderid, String orderstate) {

        Ordermodel findOrder = orderRepo.findById(orderid)
                .orElseThrow(() -> new RuntimeException("Order not found"));


        try {
            Ordermodel.Status newStatus = Ordermodel.Status.valueOf(orderstate.toUpperCase());
            findOrder.setOrderState(newStatus);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid order state: " + orderstate);
        }


        orderRepo.save(findOrder);


        FullpaymentDetailsDTO dto = new FullpaymentDetailsDTO();


        if (findOrder.getPayment() != null) {
            dto.setPaymentId(findOrder.getPayment().getPaymentId());
            dto.setAmount(findOrder.getPayment().getAmount());
            dto.setMethod(findOrder.getPayment().getMethod().name());
        }


        dto.setOrderid(findOrder.getOrderid());
        dto.setTotalAmount(findOrder.getTotalAmount());
        dto.setItemWeight(findOrder.getItemWeight());
        dto.setOrdertype(findOrder.getOrdertype().name());
        dto.setOrderState(findOrder.getOrderState().name());
        dto.setOrderdata(findOrder.getOrderdata());


        if (findOrder.getCustomer() != null) {
            dto.setId(findOrder.getCustomer().getId());
            dto.setFirstname(findOrder.getCustomer().getFirstname());
            dto.setLastname(findOrder.getCustomer().getLastname());
            dto.setEmail(findOrder.getCustomer().getEmail());
            dto.setPhoneNumber(findOrder.getCustomer().getPhoneNumber());
            dto.setAddress(findOrder.getCustomer().getAddress());
        }


        if (findOrder.getLonderyPack() != null) {
            dto.setLonderypackid(findOrder.getLonderyPack().getLonderypacksmodelId());
        }

        return dto;
    }

    public OrderDTO deleteCompleteOrder(Long orderid) {
        Ordermodel findOrder = orderRepo.findById(orderid)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (findOrder.getOrderState() == Ordermodel.Status.COMPLETED) {
            orderRepo.delete(findOrder);
            return modelMapper.map(findOrder, OrderDTO.class);
        }

        throw new RuntimeException("Order cannot be deleted because it is not COMPLETED");
    }

    public String sendEmailToCustomer(FullpaymentDetailsDTO dto) {
        Usermodel userFind = userRepo.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        EmailDTO emailDTO = new EmailDTO();
        emailDTO.setReceiver(userFind.getEmail());
        emailDTO.setSubject("Your Laundry Order Has Been Completed ✅");

        String body = String.format(
                "🌟 Hello %s %s,\n\n" +
                        "Great news! Your laundry order (Order ID: %d) is all done and ready. We’ve washed, dried, and folded everything with care — just the way you like it! 🧺✨\n\n" +
                        "Here’s a quick summary of your order:\n\n" +
                        "💳 Payment Method: %s\n" +
                        "💰 Amount Paid: $%.2f\n" +
                        "📦 Order Type: %s\n" +
                        "⚖️ Total Weight: %.2f kg\n" +
                        "🗓️ Order Date: %s\n" +
                        "📍 Delivery Address: %s\n" +
                        "Thank you for trusting *Your Laundry Service* with your clothes — we truly appreciate it!\n\n" +
                        "If you have any questions, feedback, or would like to schedule another pickup, just reply to this email or reach us anytime at support@yourlaundry.com.\n\n" +
                        "Stay fresh and fabulous,\n" +
                        "👕 The Laundry Team"
                ,
                dto.getFirstname(),
                dto.getLastname(),
                dto.getOrderid(),
                dto.getMethod(),
                dto.getAmount(),
                dto.getOrdertype(),
                dto.getItemWeight(),
                dto.getOrderdata().toString(),
                dto.getAddress()
        );


        emailDTO.setBody(body);

        emailServices.sendEmail(emailDTO);

        return "Email sent successfully to " + userFind.getEmail();
    }

}
