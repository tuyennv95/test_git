package com.tudinh.kltn.repository.impl;

import com.tudinh.kltn.entity.Comment;
import com.tudinh.kltn.repository.CommentRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

public class CommentRepositoryImpl implements CommentRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    Query query;
    String qr;

    @Override
    public Comment getCommentByDocumentId(int id) {
        qr = "SELECT id, document_id as documentId, content, date_updated as dateUpdated" +
                " FROM comment" +
                " WHERE document_id = ?0";

        query = em.createNativeQuery(qr, "CommentResultMapping");

        query.setParameter(0, id);

        try {
            query.getSingleResult();
        } catch (Exception e) {
            System.out.println("getCommentByDocumentId Lỗi: " + e);
            return null;
        }

        return (Comment) query.getSingleResult();
    }
}
