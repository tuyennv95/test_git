package com.tudinh.kltn.service;

import com.tudinh.kltn.entity.DocumentReview;

import java.util.HashMap;
import java.util.List;

public interface DocumentReviewService {

    List<DocumentReview> getDocumentReviewsList(HashMap<String, String> propertySearch);

    DocumentReview getDocumentReviewById(int id);

    DocumentReview createDocumentReview(DocumentReview documentReview);

    boolean updateDocumentReview(DocumentReview documentReview);

    boolean deleteDocumentReview(int[] ids);
}