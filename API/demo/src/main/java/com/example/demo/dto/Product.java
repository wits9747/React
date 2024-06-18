package com.example.demo.dto;

import java.util.Date;

import lombok.Data;

@Data
public class Product {
    private int no;
    private String id;
    private String name;
    private int quantity;
    private String img;
    private Date createdAt;
    private Date updateAt;
    private int price;
}
