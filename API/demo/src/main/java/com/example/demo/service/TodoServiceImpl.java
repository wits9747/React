package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.Todo;
import com.example.demo.mapper.TodoMapper;

@Service
public class TodoServiceImpl implements TodoService {

    @Autowired
    TodoMapper todoMapper;

    @Override
    public List<Todo> list() {
        return todoMapper.list();
    }

    @Override
    public int insert(Todo todo) {
        todoMapper.insert(todo);
        return todo.getNo();
    }

    @Override
    public Todo select(int no) {
        return todoMapper.select(no);
    }

    @Override
    public int update(Todo todo) {
        return todoMapper.update(todo);
    }

    @Override
    public int delete(int no) {
        return todoMapper.delete(no);
    }

    @Override
    public int totalUpdate() {
        return todoMapper.totalUpdate();
    }

    @Override
    public int totalDelete() {
        return todoMapper.totalDelete();
    }

}
