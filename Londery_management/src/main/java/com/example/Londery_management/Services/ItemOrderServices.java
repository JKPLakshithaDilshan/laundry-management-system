package com.example.Londery_management.Services;

import com.example.Londery_management.DTO.FullIStoreItemDetailsDTO;
import com.example.Londery_management.DTO.FullItemOrderDetailsDTO;
import com.example.Londery_management.DTO.ItemOrderDTO;
import com.example.Londery_management.DTO.StoreDTO;
import com.example.Londery_management.Models.ItemsOrdermodel;
import com.example.Londery_management.Models.Itemsmodel;
import com.example.Londery_management.Models.LonderyStoremodel;
import com.example.Londery_management.Models.Usermodel;
import com.example.Londery_management.Repo.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ItemOrderServices {

    @Autowired
    private ItemOrderRepo  itemOrderRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ItemsRepo  itemsRepo;

    @Autowired
    private UserRepo   userRepo;

    @Autowired
    private LonderyStoreRepo  londeryStoreRepo;



        public ItemOrderDTO createOrder(ItemOrderDTO itemOrderDTO){
            Itemsmodel item = itemsRepo.findById(itemOrderDTO.getItemId())
                    .orElseThrow(() -> new RuntimeException("Item not found with id: " + itemOrderDTO.getItemId()));

            Usermodel supplier = userRepo.findById(itemOrderDTO.getSupplierId())
                    .orElseThrow(() -> new RuntimeException("Supplier not found with id: " + itemOrderDTO.getSupplierId()));

            ItemsOrdermodel order = new ItemsOrdermodel();
            order.setItem(item);
            order.setSupplier(supplier);
            order.setQuantity(itemOrderDTO.getQuantity());
            order.setTotalPrice(itemOrderDTO.getTotalPrice());
            order.setOrderType(ItemsOrdermodel.orderType.REQUEST);

            itemOrderRepo.save(order);

            return modelMapper.map(order, ItemOrderDTO.class);
        }

    public List<FullItemOrderDetailsDTO> getAllOrdersBySupplierId(Long supplierId) {

        List<ItemsOrdermodel> orders = itemOrderRepo.findBySupplier_Id(supplierId);

        if (orders.isEmpty()) {
            throw new RuntimeException("No item orders found for supplier ID: " + supplierId);
        }

        return orders.stream().map(order -> {
            FullItemOrderDetailsDTO dto = new FullItemOrderDetailsDTO();

            dto.setItemsOrderId(order.getItemsOrderId());
            dto.setOrderquantity(order.getQuantity());
            dto.setTotalPrice(order.getTotalPrice());
            dto.setOrderType(String.valueOf(order.getOrderType()));

                dto.setItemId(order.getItem().getItemId());
                dto.setName(order.getItem().getName());
                dto.setDescription(order.getItem().getDescription());
                dto.setImageUrl(order.getItem().getImageUrl());
                dto.setPrice(order.getItem().getPrice());
                dto.setQuantity(order.getItem().getQuantity());

            Usermodel supplier = order.getSupplier();
            if (supplier != null) {
                dto.setSupplierId(supplier.getId());
                dto.setFirstname(supplier.getFirstname());
                dto.setLastname(supplier.getLastname());
                dto.setEmail(supplier.getEmail());
                dto.setPhoneNumber(supplier.getPhoneNumber());
                dto.setAddress(supplier.getAddress());
            }

            return dto;
        }).collect(Collectors.toList());
    }


    public List<FullItemOrderDetailsDTO> getAllOrders(){
            List<ItemsOrdermodel> Allorders = itemOrderRepo.findAll();

            if (Allorders.isEmpty()) {
                throw new RuntimeException("No item orders found");
            }
        return Allorders.stream()
                .filter(order -> order.getOrderType() != null
                        && order.getOrderType().toString().equalsIgnoreCase("REQUEST"))
                .map(order -> {
            FullItemOrderDetailsDTO dto = new FullItemOrderDetailsDTO();

            dto.setItemsOrderId(order.getItemsOrderId());
            dto.setOrderquantity(order.getQuantity());
            dto.setTotalPrice(order.getTotalPrice());
            dto.setOrderType(String.valueOf(order.getOrderType()));

            dto.setItemId(order.getItem().getItemId());
            dto.setName(order.getItem().getName());
            dto.setDescription(order.getItem().getDescription());
            dto.setImageUrl(order.getItem().getImageUrl());
            dto.setPrice(order.getItem().getPrice());
            dto.setQuantity(order.getItem().getQuantity());

            Usermodel supplier = order.getSupplier();
            if (supplier != null) {
                dto.setSupplierId(supplier.getId());
                dto.setFirstname(supplier.getFirstname());
                dto.setLastname(supplier.getLastname());
                dto.setEmail(supplier.getEmail());
                dto.setPhoneNumber(supplier.getPhoneNumber());
                dto.setAddress(supplier.getAddress());
            }

            return dto;
        }).collect(Collectors.toList());

    }

    public String confirmOrder(Long itemOrderId) {

        ItemsOrdermodel order = itemOrderRepo.findById(itemOrderId)
                .orElseThrow(() -> new RuntimeException(" Order not found with ID: " + itemOrderId));


        Itemsmodel item = order.getItem();
        if (item == null) {
            throw new RuntimeException(" No item linked to this order!");
        }


        if (item.getQuantity() < order.getQuantity()) {
            throw new RuntimeException(" Not enough stock for item: " + item.getName());
        }


        item.setQuantity(item.getQuantity() - order.getQuantity());
        itemsRepo.save(item);


        order.setOrderType(ItemsOrdermodel.orderType.CONFORMED);
        itemOrderRepo.save(order);


        LonderyStoremodel existingStoreItem = londeryStoreRepo.findByItemName(item.getName()).orElse(null);

        if (existingStoreItem != null) {
            // Item already in store → increase quantity
            existingStoreItem.setItemQuantity(existingStoreItem.getItemQuantity() + order.getQuantity());
            londeryStoreRepo.save(existingStoreItem);
        } else {

            LonderyStoremodel newStoreItem = new LonderyStoremodel();
            newStoreItem.setItemName(item.getName());
            newStoreItem.setItemDescription(item.getDescription());
            newStoreItem.setItemImageUrl(item.getImageUrl());
            newStoreItem.setItemPrice(item.getPrice());
            newStoreItem.setItemQuantity(order.getQuantity());
            newStoreItem.setSupplier(order.getSupplier());
            newStoreItem.setSourceOrder(order);

            londeryStoreRepo.save(newStoreItem);
        }

        return " Order confirmed successfully and stock updated!";
    }

    public String cancelOrder(Long itemOrderId) {

            Optional<ItemsOrdermodel> findOrder = itemOrderRepo.findById(itemOrderId);
            if(findOrder.get().getOrderType().equals(ItemsOrdermodel.orderType.CONFORMED)) {
                throw new RuntimeException(" Order can not be cancelled!");
            }
             itemOrderRepo.deleteById(itemOrderId);

            return " Order cancelled successfully and stock updated!";

    }

    public List<FullIStoreItemDetailsDTO> getAllStoreItems() {
        List<LonderyStoremodel> storeItems = londeryStoreRepo.findAll();


        return storeItems.stream().map(item -> {
            FullIStoreItemDetailsDTO dto = new FullIStoreItemDetailsDTO();
            dto.setLonderyStoreId(item.getLonderyStoreId());
            dto.setItemName(item.getItemName());
            dto.setItemDescription(item.getItemDescription());
            dto.setItemImageUrl(item.getItemImageUrl());
            dto.setItemPrice(item.getItemPrice());
            dto.setItemQuantity(item.getItemQuantity());

            // Set supplier details
            if (item.getSupplier() != null) {
                dto.setFirstname(item.getSupplier().getFirstname());
                dto.setLastname(item.getSupplier().getLastname());
                dto.setEmail(item.getSupplier().getEmail());
                dto.setPhoneNumber(item.getSupplier().getPhoneNumber());
                dto.setAddress(item.getSupplier().getAddress());
                dto.setSupplierId(item.getSupplier().getId());
            }

            if (item.getSourceOrder() != null) {
                dto.setQuantity(item.getSourceOrder().getQuantity());
                dto.setTotalPrice(item.getSourceOrder().getTotalPrice());
                dto.setOrderType(String.valueOf(item.getSourceOrder().getOrderType()));
            }

            return dto;
        }).collect(Collectors.toList());
    }

    public String updateItemCount(Long itemOrderId, BigDecimal totalPrice, Integer quantity) {

        ItemsOrdermodel itemOrder = itemOrderRepo.findById(itemOrderId)
                .orElseThrow(() -> new RuntimeException("Item order not found with ID: " + itemOrderId));


        itemOrder.setTotalPrice(totalPrice);
        itemOrder.setQuantity(quantity);

        itemOrderRepo.save(itemOrder);

        return String.format("Item order (ID: %d) updated successfully. New quantity: %d, Total price: $%.2f",
                itemOrderId, quantity, totalPrice);
    }

}
