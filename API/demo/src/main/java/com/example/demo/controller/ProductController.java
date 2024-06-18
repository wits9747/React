package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.Product;
import com.example.demo.service.ProductService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/products")
public class ProductController {
    
    @Autowired
    private ProductService productService;

    
    @GetMapping("")
    public ResponseEntity<List<Product>> getAll() {
        List<Product> productList = productService.list();
        return ResponseEntity.ok(productList);
    }
    
    @GetMapping("/{no}")
    public ResponseEntity<Product> getOne(@PathVariable("no") Integer no) {
        Product product = productService.select(no);
        return ResponseEntity.ok(product);
    }
    
    @PostMapping()
    public ResponseEntity<Integer> create(Product product) {

        log.info(product.toString());
        int result = productService.insert(product);
        return ResponseEntity.ok(result);
    }
    
    @PutMapping()
    public ResponseEntity<Integer> update(Product produc) {
        int result = productService.update(produc);
        return ResponseEntity.ok(result);
    }
    
    @DeleteMapping("/{no}")
    public ResponseEntity<?> destroy(@PathVariable("no") Integer no) {
        int result = productService.delete(no);
        return ResponseEntity.ok(result);
    }
}
