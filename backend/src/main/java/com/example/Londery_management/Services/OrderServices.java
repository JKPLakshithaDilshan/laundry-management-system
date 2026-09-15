package com.example.Londery_management.Services;

import com.example.Londery_management.DTO.FullorderdetailsDTO;
import com.example.Londery_management.DTO.OrderDTO;
import com.example.Londery_management.Models.Londerypacksmodel;
import com.example.Londery_management.Models.Ordermodel;
import com.example.Londery_management.Models.Usermodel;
import com.example.Londery_management.Repo.LonderyPackRepo;
import com.example.Londery_management.Repo.OrderRepo;
import com.example.Londery_management.Repo.PaymentRepo;
import com.example.Londery_management.Repo.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class OrderServices {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private LonderyPackRepo  londeryPackRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PaymentRepo paymentRepo;

    public OrderDTO createOrder(OrderDTO orderRequest) {

        Usermodel customer = userRepo.findById(orderRequest.getCustomerid())
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + orderRequest.getCustomerid()));

        Londerypacksmodel londeryPack = londeryPackRepo.findById(orderRequest.getLonderypackid())
                .orElseThrow(() -> new RuntimeException("Laundry pack not found with id: " + orderRequest.getLonderypackid()));

        Ordermodel order = new Ordermodel();
        order.setOrderdata(orderRequest.getOrderdata() != null ? orderRequest.getOrderdata() : new Date());
        order.setTotalAmount(orderRequest.getTotalAmount());
        order.setItemWeight(orderRequest.getItemWeight());
        order.setOrdertype(Ordermodel.orderType.valueOf(orderRequest.getOrdertype().toUpperCase()));
        order.setCustomer(customer);
        order.setLonderyPack(londeryPack);

        Ordermodel savedOrder = orderRepo.save(order);
        return convertToDTO(savedOrder);
    }


    private OrderDTO convertToDTO(Ordermodel order) {
        OrderDTO dto = new OrderDTO();
        dto.setOrderid(order.getOrderid());
        dto.setCustomerid(order.getCustomer().getId());
        dto.setLonderypackid(order.getLonderyPack() != null ? order.getLonderyPack().getLonderypacksmodelId() : null);
        dto.setTotalAmount(order.getTotalAmount());
        dto.setItemWeight(order.getItemWeight());
        dto.setOrdertype(order.getOrdertype().name());
        dto.setOrderState(order.getOrderState().name());
        dto.setOrderdata(order.getOrderdata());
        return dto;
    }


    public List<FullorderdetailsDTO> getOrderdetails() {
        List<Ordermodel> allOrders = orderRepo.findAll();

        return allOrders.stream()
                .filter(order -> !paymentRepo.existsByOrder(order))
                .map(order -> {
                    FullorderdetailsDTO dto = new FullorderdetailsDTO();

                    dto.setOrderid(order.getOrderid());
                    dto.setOrderdata(order.getOrderdata());
                    dto.setTotalAmount(order.getTotalAmount());
                    dto.setItemWeight(order.getItemWeight());
                    dto.setOrderType(order.getOrdertype().name());
                    dto.setOrderState(order.getOrderState().name());

                    if (order.getCustomer() != null) {
                        dto.setCustomerid(order.getCustomer().getId());
                        dto.setFirstname(order.getCustomer().getFirstname());
                        dto.setLastname(order.getCustomer().getLastname());
                        dto.setEmail(order.getCustomer().getEmail());
                        dto.setPhoneNumber(order.getCustomer().getPhoneNumber());
                        dto.setAddress(order.getCustomer().getAddress());
                    }

                    if (order.getLonderyPack() != null) {
                        dto.setPackTitle(order.getLonderyPack().getPackTitle());
                        dto.setPackDescription(order.getLonderyPack().getPackDescription());
                        dto.setOneKGprice(order.getLonderyPack().getOneKGprice());
                    }

                    return dto;
                })
                .collect(Collectors.toList());
    }

    public List<FullorderdetailsDTO> sendOrderUnique(Long  customerid) {
        List<Ordermodel> allOrders = orderRepo.findByCustomer_Id(customerid);

        return allOrders.stream()
                .filter(order -> !paymentRepo.existsByOrder(order))
                .map(order -> {
            FullorderdetailsDTO dto = new FullorderdetailsDTO();

            dto.setOrderid(order.getOrderid());
            dto.setOrderdata(order.getOrderdata());
            dto.setTotalAmount(order.getTotalAmount());
            dto.setItemWeight(order.getItemWeight());
            dto.setOrderType(order.getOrdertype().name());
            dto.setOrderState(order.getOrderState().name());

            if (order.getCustomer() != null) {
                dto.setCustomerid(order.getCustomer().getId());
                dto.setFirstname(order.getCustomer().getFirstname());
                dto.setLastname(order.getCustomer().getLastname());
                dto.setEmail(order.getCustomer().getEmail());
                dto.setPhoneNumber(order.getCustomer().getPhoneNumber());
                dto.setAddress(order.getCustomer().getAddress());
            }

            if (order.getLonderyPack() != null) {
                dto.setPackTitle(order.getLonderyPack().getPackTitle());
                dto.setPackDescription(order.getLonderyPack().getPackDescription());
                dto.setOneKGprice(order.getLonderyPack().getOneKGprice());
            }

            return dto;
        }).collect(Collectors.toList());
    }

    public OrderDTO updateOrder(OrderDTO orderDTO) {
        if (orderDTO.getOrderid() == null) {
            throw new IllegalArgumentException("Order ID must not be null");
        }

        Ordermodel existingOrder = orderRepo.findById(orderDTO.getOrderid())
                .orElseThrow(() -> new RuntimeException("Order does not exist with ID: " + orderDTO.getOrderid()));

        if(!Objects.equals(orderDTO.getOrderState(), "NOTPICKUP")){
            throw new IllegalArgumentException("Order State must be NOTPICKUP");
        }
        existingOrder.setItemWeight(orderDTO.getItemWeight());
        existingOrder.setTotalAmount(orderDTO.getTotalAmount());

        Ordermodel savedOrder = orderRepo.save(existingOrder);
        return modelMapper.map(savedOrder, OrderDTO.class);
    }

    public OrderDTO deleteOrder(Long orderid) {
        Ordermodel existingOrder = orderRepo.findById(orderid).orElseThrow(() ->
                new RuntimeException("Order does not exist with ID: " + orderid));

        if (existingOrder.getOrderState().equals("NOTPICKUP")) {
            throw new IllegalArgumentException("Cannot delete order with state: NOTPICKUP");
        }

        orderRepo.delete(existingOrder);
        return convertToDTO(existingOrder);
    }

    public List<FullorderdetailsDTO> getFullorders() {
        List<Ordermodel> allOrders = orderRepo.findAll();

        return allOrders.stream()
                .map(order -> {
                    FullorderdetailsDTO dto = new FullorderdetailsDTO();

                    dto.setOrderid(order.getOrderid());
                    dto.setOrderdata(order.getOrderdata());
                    dto.setTotalAmount(order.getTotalAmount());
                    dto.setItemWeight(order.getItemWeight());
                    dto.setOrderType(order.getOrdertype().name());
                    dto.setOrderState(order.getOrderState().name());

                    if (order.getCustomer() != null) {
                        dto.setCustomerid(order.getCustomer().getId());
                        dto.setFirstname(order.getCustomer().getFirstname());
                        dto.setLastname(order.getCustomer().getLastname());
                        dto.setEmail(order.getCustomer().getEmail());
                        dto.setPhoneNumber(order.getCustomer().getPhoneNumber());
                        dto.setAddress(order.getCustomer().getAddress());
                    }

                    if (order.getLonderyPack() != null) {
                        dto.setPackTitle(order.getLonderyPack().getPackTitle());
                        dto.setPackDescription(order.getLonderyPack().getPackDescription());
                        dto.setOneKGprice(order.getLonderyPack().getOneKGprice());
                    }

                    return dto;
                })
                .collect(Collectors.toList());
    }

}

