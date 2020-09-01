package com.tudinh.kltn.repository.impl;

import com.tudinh.kltn.entity.FileManager;
import com.tudinh.kltn.repository.FileManagerRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;

public class FileManagerRepositoryImpl implements FileManagerRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    Query query;
    String qr;

    @Override
    public List<FileManager> getFileManagersList(HashMap<String, String> propertySearch) {
        qr = "SELECT id, document_id AS documentId, file" +
                " FROM file_manager Where 1 = 1 ";

        if (propertySearch.get("documentId") != null) {
            qr += " AND document_id = " + propertySearch.get("documentId");
        }

        query = em.createNativeQuery(qr, "FileManagerResultMapping");

        return query.getResultList();
    }
}
