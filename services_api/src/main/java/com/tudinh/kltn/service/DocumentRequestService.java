package com.tudinh.kltn.service;

import com.tudinh.kltn.entity.DocumentRequest;
import com.tudinh.kltn.entity.result.DocumentRequestResult;

import java.util.HashMap;
import java.util.List;

public interface DocumentRequestService {

    List<DocumentRequestResult> getDocumentRequestsList(HashMap<String, String> propertySearch);

    int getCountDocumentRequest(HashMap<String, String> propertySearch);

    DocumentRequest getDocumentRequestById(int id);

    DocumentRequest createDocumentRequest(DocumentRequest documentRequest);

    boolean updateDocumentRequest(DocumentRequest documentRequest);

    boolean deleteDocumentRequest(int[] ids);
}