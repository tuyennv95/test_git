package com.tudinh.kltn.service.impl;

import com.tudinh.kltn.entity.DocumentReview;
import com.tudinh.kltn.repository.DocumentReviewRepository;
import com.tudinh.kltn.service.DocumentReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class DocumentReviewServiceImpl implements DocumentReviewService {

    @Autowired
    DocumentReviewRepository documentReviewRepository;

    @Override
    public List<DocumentReview> getDocumentReviewsList(HashMap<String, String> propertySearch) {
        return documentReviewRepository.getDocumentReviewsList(propertySearch);
    }

    @Override
    public DocumentReview getDocumentReviewById(int id) {
        return documentReviewRepository.findById(id).get();
    }

    @Override
    public DocumentReview createDocumentReview(DocumentReview documentReview) {
        return documentReviewRepository.save(documentReview);
    }

    @Override
    public boolean updateDocumentReview(DocumentReview documentReview) {
        DocumentReview _documentReview = getDocumentReviewById(documentReview.getId());

        if (_documentReview.getId() > 0) {
            documentReviewRepository.save(documentReview);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteDocumentReview(int[] ids) {
        return documentReviewRepository.deleteDocumentReview(ids);
    }
}

