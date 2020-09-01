package com.tudinh.kltn.service.impl;

import com.tudinh.kltn.entity.Document;
import com.tudinh.kltn.entity.result.DocumentResult;
import com.tudinh.kltn.repository.DocumentRepository;
import com.tudinh.kltn.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class DocumentServiceImpl implements DocumentService {

    @Autowired
    DocumentRepository documentRepository;

    @Override
    public List<DocumentResult> getDocumentsList(HashMap<String, String> propertySearch) {
        return documentRepository.getDocumentsList(propertySearch);
    }

    @Override
    public int getCountDocument(HashMap<String, String> propertySearch) {
        return documentRepository.getCountDocument(propertySearch);
    }

    @Override
    public Document getDocumentById(int id, int plus) {
        Document document = documentRepository.findById(id).get();
        if (plus == 1) {
            document.setViewsCount(document.getViewsCount() + 1);
            documentRepository.save(document);
        }

        return document;
    }

    @Override
    public void upViewDownload(int id) {
        Document document = documentRepository.findById(id).get();
        document.setDownloadsCount(document.getDownloadsCount() + 1);
        documentRepository.save(document);
    }

    @Override
    public Document createDocument(Document document) {
        return documentRepository.save(document);
    }

    @Override
    public boolean updateDocument(Document document) {
        Document _document = documentRepository.findById(document.getId()).get();

        if (_document.getId() > 0) {
            documentRepository.save(document);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteDocument(int[] ids) {
        return documentRepository.deleteDocument(ids);
    }
}

