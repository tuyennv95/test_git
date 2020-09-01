package com.tudinh.kltn.service.impl;

import com.tudinh.kltn.entity.FileManager;
import com.tudinh.kltn.repository.FileManagerRepository;
import com.tudinh.kltn.service.FileManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class FileManagerServiceImpl implements FileManagerService {

    @Autowired
    FileManagerRepository fileManagerRepository;

    @Override
    public List<FileManager> getFileManagersList(HashMap<String, String> propertySearch) {
        return fileManagerRepository.getFileManagersList(propertySearch);
    }

    @Override
    public FileManager getFileManagerById(int id) {
        return fileManagerRepository.findById(id).get();
    }

    @Override
    public FileManager createFileManager(FileManager fileManager) {
        return fileManagerRepository
                .save(new FileManager(fileManager.getId(), fileManager.getDocumentId(), fileManager.getFile()));
    }

    @Override
    public void deleteFileManager(FileManager file) {
        fileManagerRepository.delete(file);
    }
}

