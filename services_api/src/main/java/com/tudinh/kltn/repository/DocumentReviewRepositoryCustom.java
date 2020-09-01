package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.DocumentReview;

import java.util.HashMap;
import java.util.List;


public interface DocumentReviewRepositoryCustom {

    List<DocumentReview> getDocumentReviewsList(HashMap<String, String> propertySearch);

    boolean deleteDocumentReview(int[] ids);

}
