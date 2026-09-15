package com.example.Londery_management.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Ordermodel {

    public enum orderType { STORE_PICKUP, DELIVERY }
    public enum Status { NOTPICKUP,PICKUP, CLEANING, DELIVERY, COMPLETED, CANCELLED }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderid;

    @Column(nullable = false)  
    @Temporal(TemporalType.TIMESTAMP)
    private Date orderdata = new Date();

    @Column(nullable = false)
    private BigDecimal totalAmount;

    @Column(nullable = false)
    private BigDecimal itemWeight;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private orderType ordertype;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status orderState = Status.NOTPICKUP;

    @ManyToOne
    @JoinColumn(name = "customerid", referencedColumnName = "id", nullable = false )
    private Usermodel customer;


    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Feedbackmodel> feedbacks;

    @ManyToOne
    @JoinColumn(name = "londerypack_id", referencedColumnName = "londerypacksmodelId")
    private Londerypacksmodel londeryPack;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Paymentmodel payment;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private DeleveryRatingmodel deliveryRating;

}
