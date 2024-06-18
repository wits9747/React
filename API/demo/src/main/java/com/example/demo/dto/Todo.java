package com.example.demo.dto;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class Todo {
    private int no;
    private String name;
    private int status;
    private Timestamp regDate;
    private Timestamp updDate;
}
