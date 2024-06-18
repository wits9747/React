package com.example.demo.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.Files;

import jakarta.servlet.http.HttpServletResponse;

public interface FileService {
    public List<Files> list();
    public Files select(int no);
    public int update(Files file);
    public int insert(Files file);
    public int delete(int no);

    public Files upload(Files file) throws Exception;

    // 여러 파일 업로드
    public List<Files> uploadFiles(Files file, List<MultipartFile> fileList) throws Exception;

    public List<Files> listByParent(int parentNo);

    public int download(int no, HttpServletResponse response) throws Exception;
}
