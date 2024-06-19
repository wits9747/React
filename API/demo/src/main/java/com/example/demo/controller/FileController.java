package com.example.demo.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.Files;
import com.example.demo.service.FileService;
import com.example.demo.utils.MediaUtil;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

/**
 * 🎨파일
 * ⚽파일 업로드
 * ⚽⚽파일 다운로드
 * ⚽⚽⚽이미지 썸네일
 * ⚽⚽⚽⚽파일 삭제
 */

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/files")
public class FileController {

    @Autowired
    private FileService fileService;

    // 프로젝트 내의 자원을 접근하는 객체
    @Autowired
    private ResourceLoader resourceLoader;

    /**
     * 파일 업로드
     * 
     * @param file
     * @return
     */
    @PostMapping("")
    public ResponseEntity<?> create(Files file) {
        try {
            Files uploadedFile = fileService.upload(file);
            return new ResponseEntity<>(uploadedFile, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{no}")
    public void fileDownload(@PathVariable("no") int no, HttpServletResponse response) throws Exception {
        fileService.download(no, response);
    }

    @GetMapping("/img/{no}")
    public void thumbnail(@PathVariable("no") Integer no, HttpServletResponse response) throws IOException {
        if (no == null) return;
        // 1.파일 번호로 파일 정보 조회
        Files file = fileService.select(no);
        // 2.파일 정보에서 파일 경로 추출
        String filePath = file.getFilePath();

        // 3.파일 시스템에서 이미지 파일 입력
        File imgFile = null;
        // 이미지가 없을 때 => no-image.jpg로 지정
        boolean existFile = new File(filePath).exists(); // 파일 존재유무 확인

        String noImagePath = "classpath:static/img/no_img.gif";
        Resource resource = resourceLoader.getResource(noImagePath);
        if (file == null || !existFile) {
            
            imgFile = resource.getFile();
        } else {
            imgFile = new File(filePath);
        }

        // 4.이미지의 확장자를 확인해서 content-type 응답헤더 지정
        String ext = filePath.substring(filePath.lastIndexOf(".")+1);  //png,jpg
        // MediaType : Content-Type 중, image, audio, video 등
        MediaType mediaType = MediaUtil.getMediaType(ext);

        // 이미지 미디어 타입이 아닌 경우 -> no-image 처리
        if(mediaType==null){
            mediaType = MediaType.IMAGE_GIF;
            imgFile = resource.getFile();
        }

        response.setContentType(mediaType.toString());

        // 5.이미지 파일 응답
        FileInputStream fis = new FileInputStream(imgFile);
        ServletOutputStream sos = response.getOutputStream();
        FileCopyUtils.copy(fis  ,sos);
    }

    @DeleteMapping("/{no}")
    public ResponseEntity<?> deleteFile(@PathVariable("no") Integer no){
        log.info("파일 삭제");

        if(no == null)
        return new ResponseEntity<>("FAIL",HttpStatus.BAD_REQUEST);

        try {
            int result = fileService.delete(no);
            if(result>0){
                return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            }else{
                return new ResponseEntity<>("FAIL", HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteFiles(@RequestParam("no") String no){
        log.info("파일 선택 삭제");

        if(no == null)
        return new ResponseEntity<>("FAIL",HttpStatus.BAD_REQUEST);

        try {
            int result = fileService.deleteFiles(no);
            if(result>0){
                return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            }else{
                return new ResponseEntity<>("FAIL", HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
