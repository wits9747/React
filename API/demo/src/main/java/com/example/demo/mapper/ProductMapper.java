package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.dto.Product;

@Mapper
public interface ProductMapper {

    public List<Product> list();

    public int insert(Product product);

    public int update(Product product);

    public int delete(int no);

    public Product  select(int no);
}
