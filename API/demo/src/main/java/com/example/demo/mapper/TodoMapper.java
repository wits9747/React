package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.dto.Todo;

@Mapper
public interface TodoMapper {
    
    public List<Todo> list();

    public int insert(Todo todo);

    public Todo select(int no);

    public int update(Todo todo);

    public int delete(int no);

    public int totalUpdate();

    public int totalDelete();




    
}
