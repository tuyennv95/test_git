package com.tudinh.kltn.service.impl;

import com.tudinh.kltn.entity.DocumentRequest;
import com.tudinh.kltn.entity.result.DocumentRequestResult;
import com.tudinh.kltn.repository.DocumentRequestRepository;
import com.tudinh.kltn.service.DocumentRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class DocumentRequestServiceImpl implements DocumentRequestService {

    @Autowired
    DocumentRequestRepository subjectRepository;

    @Override
    public List<DocumentRequestResult> getDocumentRequestsList(HashMap<String, String> propertySearch) {
        return subjectRepository.getDocumentRequestsList(propertySearch);
    }

    @Override
    public int getCountDocumentRequest(HashMap<String, String> propertySearch) {
        return subjectRepository.getCountDocumentRequest(propertySearch);
    }

    @Override
    public DocumentRequest getDocumentRequestById(int id) {
        return subjectRepository.findById(id).get();
    }

    @Override
    public DocumentRequest createDocumentRequest(DocumentRequest subject) {
        return subjectRepository.save(subject);
    }

    @Override
    public boolean updateDocumentRequest(DocumentRequest subject) {
        DocumentRequest _subject = getDocumentRequestById(subject.getId());

        if (_subject.getId() > 0) {
            subjectRepository.save(subject);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteDocumentRequest(int[] ids) {
        return subjectRepository.deleteDocumentRequest(ids);
    }
}

