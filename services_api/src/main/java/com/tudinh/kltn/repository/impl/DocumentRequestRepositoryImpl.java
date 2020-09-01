package com.tudinh.kltn.repository.impl;

import com.tudinh.kltn.entity.DocumentRequest;
import com.tudinh.kltn.entity.result.DocumentRequestResult;
import com.tudinh.kltn.repository.DocumentRequestRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;

public class DocumentRequestRepositoryImpl implements DocumentRequestRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    Query query;
    String qr;

    @Override
    public List<DocumentRequestResult> getDocumentRequestsList(HashMap<String, String> propertySearch) {
        qr = "SELECT dr.id AS id, dr.student_code AS studentCode, u.first_name AS firstName, u.last_name AS lastName," +
                "s.class_code AS classCode, dr.title AS title, dr.request AS request, dr.comment AS COMMENT," +
                "dr.status AS STATUS " +
                "FROM document_request AS dr, student AS s, USER AS u " +
                "WHERE dr.student_code = s.student_code AND s.student_code = u.username ";

        if (propertySearch.get("studentCode") != null) {
            qr += " AND dr.student_code = '" + propertySearch.get("studentCode") + "'";
        }
        if (propertySearch.get("searchText") != null) {
            qr += "AND CONCAT_WS('', dr.title, dr.request)  like '%" + propertySearch.get("searchText") + "%'";
        }
        if (propertySearch.get("orderCol") != null && propertySearch.get("orderCol") != "") {
            qr += " order by " + propertySearch.get("orderCol");
            if (propertySearch.get("isAsc") != null) {
                if (Boolean.parseBoolean(propertySearch.get("isAsc")) == true) {
                    qr += " ASC ";
                } else {
                    qr += " DESC ";
                }
            }
        }
        if (propertySearch.get("limit") != null && propertySearch.get("page") != null) {
            int startSearch = (Integer.parseInt(propertySearch.get("page")) - 1)
                    * Integer.parseInt(propertySearch.get("limit"));
            qr += " limit " + startSearch + "," + propertySearch.get("limit");
        }

        query = em.createNativeQuery(qr, "DocumentRequestResultMapping");

        return query.getResultList();
    }

    @Override
    public int getCountDocumentRequest(HashMap<String, String> propertySearch) {
        qr = "SELECT dr.id AS id, dr.student_code AS studentCode, u.first_name AS firstName, u.last_name AS lastName," +
                "s.class_code AS classCode, dr.title AS title, dr.request AS request, dr.comment AS COMMENT," +
                "dr.status AS STATUS " +
                "FROM document_request AS dr, student AS s, USER AS u " +
                "WHERE dr.student_code = s.student_code AND s.student_code = u.username ";

        if (propertySearch.get("studentCode") != null) {
            qr += " AND dr.student_code = '" + propertySearch.get("studentCode") + "'";
        }
        if (propertySearch.get("searchText") != null) {
            qr += "AND CONCAT_WS('', dr.title, dr.request)  like '%" + propertySearch.get("searchText") + "%'";
        }

        query = em.createNativeQuery(qr, "DocumentRequestResultMapping");
        List<DocumentRequest> list = query.getResultList();

        return list.size();
    }

    @Override
    public boolean deleteDocumentRequest(int[] ids) {
        qr = "DELETE FROM document_request WHERE ";

        String qr2 = "id IN (0";
        for (int i = 0; i < ids.length; i++) {
            qr2 += ", " + ids[i];
        }

        query = em.createNativeQuery(qr + qr2 + ")");

        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("deleteDocumentRequest Lỗi: " + e);
            return false;
        }

        return true;
    }
}
