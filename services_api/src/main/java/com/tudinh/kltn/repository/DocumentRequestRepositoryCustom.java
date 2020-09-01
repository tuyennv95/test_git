package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.DocumentRequest;
import com.tudinh.kltn.entity.result.DocumentRequestResult;

import java.util.HashMap;
import java.util.List;


public interface DocumentRequestRepositoryCustom {

    List<DocumentRequestResult> getDocumentRequestsList(HashMap<String, String> propertySearch);

    int getCountDocumentRequest(HashMap<String, String> propertySearch);

    boolean deleteDocumentRequest(int[] ids);

}
