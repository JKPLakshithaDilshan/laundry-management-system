package com.example.Londery_management.Services;

import com.example.Londery_management.DTO.FullItemsDTO;
import com.example.Londery_management.DTO.FullorderdetailsDTO;
import com.example.Londery_management.DTO.ItemDTO;
import com.example.Londery_management.Models.Itemsmodel;
import com.example.Londery_management.Models.Usermodel;
import com.example.Londery_management.Repo.ItemsRepo;
import com.example.Londery_management.Repo.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemsServices {

    @Autowired
    private ItemsRepo itemsRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepo userRepo;

    public ItemDTO supplyItems(ItemDTO itemDTO) {
        Itemsmodel findItems = itemsRepo.findByName(itemDTO.getName()).orElse(null);
        if (findItems != null) {
            throw new RuntimeException("Item with name " + itemDTO.getName() + " already exists");
        }
       Itemsmodel saveItems =  itemsRepo.save(modelMapper.map(itemDTO,Itemsmodel.class));
        return modelMapper.map(saveItems,ItemDTO.class);
    }

    public List<FullItemsDTO> getSupplyItems() {
        List<Itemsmodel> findItems = itemsRepo.findAll();

        return findItems.stream()
                .map(item -> {
                    FullItemsDTO dto = new FullItemsDTO();
                    dto.setItemId(item.getItemId());
                    dto.setName(item.getName());
                    dto.setDescription(item.getDescription());
                    dto.setPrice(item.getPrice());
                    dto.setQuantity(item.getQuantity());
                    dto.setImageUrl(item.getImageUrl());
                    if (item.getSupplier() != null) {
                        dto.setSupplierId(item.getSupplier().getId());
                        dto.setFirstname(item.getSupplier().getFirstname());
                        dto.setLastname(item.getSupplier().getLastname());
                        dto.setEmail(item.getSupplier().getEmail());
                        dto.setAddress(item.getSupplier().getAddress());
                        dto.setPhoneNumber(item.getSupplier().getPhoneNumber());
                    }

                    return dto;
                })
                .toList();
    }


    public ItemDTO updateItem(ItemDTO itemDTO) {
        Itemsmodel findItems = itemsRepo.findById(itemDTO.getItemId()).orElse(null);

        if (findItems == null) {
            throw new RuntimeException("Item with id " + itemDTO.getItemId() + " already exists");
        }
        findItems.setImageUrl(itemDTO.getImageUrl());
        findItems.setQuantity(itemDTO.getQuantity());
        findItems.setPrice(itemDTO.getPrice());

        Itemsmodel saveItems = itemsRepo.save(modelMapper.map(itemDTO,Itemsmodel.class));
        return modelMapper.map(saveItems,ItemDTO.class);
    }

    public List<ItemDTO> getUiquelyItems(Long supplierId) {
        List<Itemsmodel> findItems = itemsRepo.findBySupplierId(supplierId);
        if (findItems.isEmpty()) {
            throw new RuntimeException("This Supplire Didn't add Items");
        }

        return findItems.stream().map(item ->
                modelMapper.map(item,ItemDTO.class))
                .collect(Collectors
                        .toList());

    }

    public ItemDTO deleteItem(Long itemId, Long supplierId) {

        Itemsmodel findItem = itemsRepo.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        Usermodel findUser = userRepo.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean isAdmin = "Admin".equalsIgnoreCase(findUser.getRole());
        boolean isOwner = findItem.getSupplier() != null &&
                findItem.getSupplier().getId().equals(supplierId);

        if (!isAdmin && !isOwner) {
            throw new RuntimeException("Access denied: You do not have permission to delete this item");
        }

        itemsRepo.delete(findItem);
        return modelMapper.map(findItem, ItemDTO.class);
    }

}

