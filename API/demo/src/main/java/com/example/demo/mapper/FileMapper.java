package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.example.demo.dto.Files;

import jakarta.servlet.http.HttpServletResponse;

@Mapper
public interface FileMapper {
    public List<Files> list();
    public Files select(int no);
    public int update(Files file);
    public int insert(Files file);
    public int delete(int no);


    // @Delete("DELETE FROM files WHERE parent_no = #{parentNo}")
    // public int deleteParentNo(int parentNo);

    @Select("SELECT * FROM file WHERE parent_no = #{parentNo}")
    public List<Files> listByParent(int parentNo);

    public int download(int no, HttpServletResponse response);

}
