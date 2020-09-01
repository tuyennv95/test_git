package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.FileManager;

import java.util.HashMap;
import java.util.List;


public interface FileManagerRepositoryCustom {

    List<FileManager> getFileManagersList(HashMap<String, String> propertySearch);

}
