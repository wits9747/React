package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.Product;

public interface ProductService {
    public List<Product> list();

    public int insert(Product product);

    public int update(Product product);

    public int delete(int no);

    public Product select(int no);
}
