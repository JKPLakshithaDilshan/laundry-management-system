package com.example.Londery_management.Services;

import com.example.Londery_management.DTO.ItemDTO;
import com.example.Londery_management.DTO.LonderyPackDTO;
import com.example.Londery_management.Models.Londerypacksmodel;
import com.example.Londery_management.Repo.LonderyPackRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class LonderyPackServices {

    @Autowired
    private LonderyPackRepo londeryPackRepo;

    @Autowired
    private ModelMapper modelMapper;

    public LonderyPackDTO createLonderyPack( LonderyPackDTO londeryPackDTO) {
        if (londeryPackRepo.findByPackTitle(londeryPackDTO.getPackTitle()).isPresent()) {
            throw new RuntimeException("Laundry pack already exists");
        }
        Londerypacksmodel newPack = modelMapper.map(londeryPackDTO, Londerypacksmodel.class);
        Londerypacksmodel savedPack = londeryPackRepo.save(newPack);
        return modelMapper.map(savedPack, LonderyPackDTO.class);
    }

    public List<LonderyPackDTO> getallpacks(){
        List<Londerypacksmodel> allpacks = londeryPackRepo.findAll();
        return allpacks.stream().map(l -> modelMapper.map(l,LonderyPackDTO.class))
                .collect(Collectors
                        .toList());
    }

    public LonderyPackDTO updatepack(LonderyPackDTO londeryPackDTO) {
        Londerypacksmodel updatePack = londeryPackRepo.findById(londeryPackDTO.getLonderypacksmodelId())
                .orElse(null);
        if (updatePack == null) {
            throw new RuntimeException("Laundry pack not found");
        }
        updatePack.setPackDescription(londeryPackDTO.getPackDescription());
        updatePack.setOneKGprice(londeryPackDTO.getOneKGprice());

        Londerypacksmodel  updatedPack = londeryPackRepo.save(updatePack);
        return modelMapper.map(updatedPack,LonderyPackDTO.class);

    }

    public LonderyPackDTO deletepack(Long londerypacksmodelId) {
        Londerypacksmodel findLonderyPack =  londeryPackRepo.findById(londerypacksmodelId).orElse(null);
        if (findLonderyPack == null) {
            throw new RuntimeException("Laundry pack not found");
        }
        londeryPackRepo.delete(findLonderyPack);
        return modelMapper.map(findLonderyPack,LonderyPackDTO.class);
    }
}