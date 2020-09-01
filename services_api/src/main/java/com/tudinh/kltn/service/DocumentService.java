package com.tudinh.kltn.service;

import com.tudinh.kltn.entity.Document;
import com.tudinh.kltn.entity.result.DocumentResult;

import java.util.HashMap;
import java.util.List;

public interface DocumentService {

    List<DocumentResult> getDocumentsList(HashMap<String, String> propertySearch);

    int getCountDocument(HashMap<String, String> propertySearch);

    Document getDocumentById(int id, int plus);

    void upViewDownload(int id);

    Document createDocument(Document document);

    boolean updateDocument(Document document);

    boolean deleteDocument(int[] ids);
}