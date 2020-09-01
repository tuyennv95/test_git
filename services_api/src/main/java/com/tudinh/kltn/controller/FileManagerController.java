package com.tudinh.kltn.controller;

import com.tudinh.kltn.common.Global;
import com.tudinh.kltn.entity.FileManager;
import com.tudinh.kltn.service.DocumentService;
import com.tudinh.kltn.service.FileManagerService;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/file-manager")
public class FileManagerController {

    @Autowired
    FileManagerService fileManagerService;

    @Autowired
    DocumentService documentService;

    @PostMapping("")
    public ResponseEntity<List<FileManager>> getFileManagersList(@RequestBody HashMap<String, String> propertySearch) {
        System.out.println(propertySearch);

        List<FileManager> searchResult = fileManagerService.getFileManagersList(propertySearch);

        return new ResponseEntity<>(searchResult, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public FileManager getFileManager(@PathVariable("id") int id) {
        return fileManagerService.getFileManagerById(id);
    }

    @PostMapping(value = "/create")
    public FileManager createFileManager(@RequestBody FileManager fileManager) {
        return fileManagerService.createFileManager(fileManager);
    }

    @PostMapping(value = "/upload")
    public ResponseEntity<String> uploadDocument(@RequestParam("files") MultipartFile[] files,
                                                 @RequestParam("document_id") int documentId,
                                                 @RequestParam("lecturer_code") String lecturerCode) throws Exception {
        if (files == null) {
            throw new RuntimeException("You must select the a file for uploading");
        }

        File f = new File(Global.DIR + "/services_api/src/main/public/" + lecturerCode + "/" + documentId);
        if (!f.exists()) {
            File dir = new File(Global.DIR + "/services_api/src/main/public/" + lecturerCode + "/" + documentId);
            if (dir.mkdirs()) {
                System.out.println("Create directory " + dir.getAbsolutePath() + " success.");
            }
        }

        for (MultipartFile file : files) {
            String originalName = file.getOriginalFilename();
            String name = file.getName();
            String contentType = file.getContentType();
            long size = file.getSize();
            byte[] bytes = file.getBytes();

            String pathFile = "/services_api/src/main/public/" +
                    lecturerCode + "/" + documentId + "/" + originalName;
            Path path = Paths.get(Global.DIR + pathFile);
            Files.write(path, bytes);

            System.out.println("originalName: " + originalName);
            System.out.println("name: " + name);
            System.out.println("contentType: " + contentType);
            System.out.println("size: " + size);
            System.out.println("--------------------");

            fileManagerService.createFileManager(new FileManager(documentId, pathFile));
        }

        return new ResponseEntity<String>("Đã vào đây", HttpStatus.OK);
    }

    @GetMapping("/download/{id}")
    public void downloadFile(HttpServletResponse response, @PathVariable("id") int id) throws IOException {
        try {
            FileManager fileTg = fileManagerService.getFileManagerById(id);

            File file = ResourceUtils.getFile(Global.DIR + fileTg.getFile());
            byte[] data = FileUtils.readFileToByteArray(file);
            // Thiết lập thông tin trả về
            response.setContentType("application/octet-stream");
            response.setHeader("Content-disposition", "attachment; filename=" + file.getName());
            response.setContentLength(data.length);
            InputStream inputStream = new BufferedInputStream(new ByteArrayInputStream(data));
            FileCopyUtils.copy(inputStream, response.getOutputStream());

            documentService.upViewDownload(fileTg.getDocumentId());
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @PostMapping("/delete/{id}")
    public boolean deleteFileManager(@PathVariable("id") int id) {
        try {
            FileManager file = fileManagerService.getFileManagerById(id);

            File f = new File(Global.DIR + file.getFile());
            if (f.delete()) {
                fileManagerService.deleteFileManager(file);
            }

        } catch (Exception e) {
            return false;
        }

        return true;
    }
}