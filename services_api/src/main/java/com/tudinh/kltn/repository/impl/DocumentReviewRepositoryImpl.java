package com.tudinh.kltn.repository.impl;

import com.tudinh.kltn.entity.DocumentReview;
import com.tudinh.kltn.repository.DocumentReviewRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;

public class DocumentReviewRepositoryImpl implements DocumentReviewRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    Query query;
    String qr;

    @Override
    public List<DocumentReview> getDocumentReviewsList(HashMap<String, String> propertySearch) {
        qr = "SELECT id, document_id AS documentId, is_favourite AS isFavourite, is_like AS isLike, star_vote AS starVote, " +
                " student_code as studentCode " +
                "FROM document_review " +
                "WHERE 1=1  ";

        if (propertySearch.get("documentId") != null) {
            qr += " AND document_id = " + propertySearch.get("documentId");
        }
        if (propertySearch.get("studentCode") != null) {
            qr += " AND student_code = '" + propertySearch.get("studentCode") + "'";
        }

        query = em.createNativeQuery(qr, "DocumentReviewMapping");

        return query.getResultList();
    }

    @Override
    public boolean deleteDocumentReview(int[] ids) {
        qr = "DELETE FROM document_review WHERE ";

        String qr2 = "id IN (0";
        for (int i = 0; i < ids.length; i++) {
            qr2 += ", " + ids[i];
        }

        query = em.createNativeQuery(qr + qr2 + ")");

        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("deleteDocumentReview Lỗi: " + e);
            return false;
        }

        return true;
    }
}
