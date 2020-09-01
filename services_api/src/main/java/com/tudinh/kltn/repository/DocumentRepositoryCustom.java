package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.result.DocumentResult;

import java.util.HashMap;
import java.util.List;


public interface DocumentRepositoryCustom {

    List<DocumentResult> getDocumentsList(HashMap<String, String> propertySearch);

    int getCountDocument(HashMap<String, String> propertySearch);

    boolean deleteDocument(int[] ids);

}
