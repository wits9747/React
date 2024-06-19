package com.example.demo.service;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.Board;
import com.example.demo.dto.Files;
import com.example.demo.mapper.BoardMapper;
import com.example.demo.mapper.FileMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardMapper boardMapper;

    @Autowired
    private FileService fileService;

    @Autowired
    private FileMapper fileMapper;

    @Override
    public List<Board> list() throws Exception {
        return boardMapper.list();
    }

    @Override
    public Board select(int no) throws Exception {
        return boardMapper.select(no);
    }

    @Override
    public int update(Board board) throws Exception {
         // 파일 업로드
         int uploadResult =  uploadFiles(board);
         log.info("파일 " + uploadResult+"개 업로드 되었습니다.");
        return boardMapper.update(board);
    }

    @Override
    public int insert(Board board) throws Exception {
        boardMapper.insert(board);

        // 파일 업로드
        int uploadResult =  uploadFiles(board);
        log.info("파일 " + uploadResult+"개 업로드 되었습니다.");

        return board.getNo();
    }

    @Override
    public int delete(int no) throws Exception {
        int result = boardMapper.delete(no);
       
        List<Files> deleteFileList = fileService.listByParent(no);
        for (Files deleteFile : deleteFileList) {
            fileService.delete(deleteFile.getNo());
        }
        return result;
    }


    public int uploadFiles(Board board) throws Exception{
        // 파일 업로드
        Files fileInfo = new Files();
        String parentTable = "board";
        fileInfo.setParentTable(parentTable);
        fileInfo.setParentNo(board.getNo());
        List<MultipartFile> fileList = board.getFiles();

        if (fileList == null || fileList.isEmpty()) {
            log.info("첨부한 파일이 없습니다.");
            return board.getNo();
        }

        List<Files> uploadedFileList = fileService.uploadFiles(fileInfo, fileList);

        if (uploadedFileList == null || uploadedFileList.isEmpty()) {
            log.info("파일 업로드 실패...");
            return 0;
        } else {
            log.info("파이 업로드 성공");
            log.info(uploadedFileList.toString());
            return uploadedFileList.size();
        }

    }

}