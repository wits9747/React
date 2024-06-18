package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.Todo;

public interface TodoService {
    
    public List<Todo> list();

    public int insert(Todo todo);

    public Todo select(int no);

    public int update(Todo todo);

    public int delete(int no);

    public int totalUpdate();

    public int totalDelete();
    
}
