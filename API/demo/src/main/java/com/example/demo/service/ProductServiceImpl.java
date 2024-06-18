package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.Product;
import com.example.demo.mapper.ProductMapper;


@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductMapper productMapper;

    @Override
    public List<Product> list() {
        return productMapper.list();
    }

    @Override
    public int insert(Product product) {
        productMapper.insert(product);
        return product.getNo();
    }

    @Override
    public int update(Product product) {
        return productMapper.update(product);
    }

    @Override
    public int delete(int no) {
        return productMapper.delete(no);
    }

    @Override
    public Product select(int no) {
        return productMapper.select(no);
    }
    
}
