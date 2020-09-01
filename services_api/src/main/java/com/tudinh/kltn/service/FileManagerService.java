package com.tudinh.kltn.service;

import com.tudinh.kltn.entity.FileManager;

import java.util.HashMap;
import java.util.List;

public interface FileManagerService {

    List<FileManager> getFileManagersList(HashMap<String, String> propertySearch);

    FileManager getFileManagerById(int id);

    FileManager createFileManager(FileManager file);

    void deleteFileManager(FileManager file);
}