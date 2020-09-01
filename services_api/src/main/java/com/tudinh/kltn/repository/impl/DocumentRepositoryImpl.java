package com.tudinh.kltn.repository.impl;

import com.tudinh.kltn.entity.result.DocumentResult;
import com.tudinh.kltn.repository.DocumentRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;

public class DocumentRepositoryImpl implements DocumentRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    String qr;
    Query query;

    @Override
    public List<DocumentResult> getDocumentsList(HashMap<String, String> propertySearch) {
        qr = "SELECT d.id AS id, d.document_name AS documentName, d.keyword AS keyword,d.topic_type AS topicType, " +
                "d.document_type AS documentType, d.status AS STATUS, d.lecturer_code AS lecturerCode, " +
                "l.title AS title, u.first_name AS firstName, u.last_name AS lastName, d.department_id AS departmentId, " +
                "dm.department_name AS departmentName, d.subject_id AS subjectId, s.subject_name AS subjectName, " +
                "d.description AS description, d.views_count AS viewsCount, " +
                "d.downloads_count AS downloadsCount, d.is_copyright_warning AS isCopyrightWarning, " +
                "d.user_created AS userCreated, d.date_created AS dateCreated, d.user_updated AS userUpdated, " +
                "d.date_updated AS dateUpdated " +
                "FROM document AS d " +
                "LEFT JOIN lecturer AS l ON d.lecturer_code = l.lecturer_code " +
                "LEFT JOIN USER AS u ON d.lecturer_code = u.username " +
                "LEFT JOIN department AS dm ON d.department_id = dm.id " +
                "LEFT JOIN SUBJECT AS s  ON d.subject_id = s.id " +
                "Where 1 = 1 ";

        if (propertySearch.get("topicTye") != null) {
            qr += " AND d.topic_type = " + propertySearch.get("topicTye");
        }
        if (propertySearch.get("departmentId") != null) {
            qr += " AND d.department_id = " + propertySearch.get("departmentId");
        }
        if (propertySearch.get("lecturerCode") != null) {
            qr += " AND d.lecturer_code = '" + propertySearch.get("lecturerCode") + "'";
        }
        if (propertySearch.get("subjectId") != null) {
            qr += " AND d.subject_id = " + propertySearch.get("subjectId");
        }
        if (propertySearch.get("type") != null) {
            qr += " AND d.document_type = " + propertySearch.get("type");
        }
        if (propertySearch.get("status") != null) {
            qr += " AND d.status = " + propertySearch.get("status");
        }
        if (propertySearch.get("student") != null) {
            qr += " AND d.status = 3";
        }
        if (propertySearch.get("userLogin") != null) {
            qr += " AND (d.status = 3 OR d.lecturer_code = '" + propertySearch.get("userLogin") + "')";
        }
        if (propertySearch.get("favourite") != null && propertySearch.get("favourite") != "") {
            qr += " AND d.id IN (" + propertySearch.get("favourite") + ") ";
        }
        if (propertySearch.get("searchText") != null) {
            qr += " AND CONCAT_WS('', d.lecturer_code, u.first_name, u.first_name, d.document_name, d.keyword, " +
                    " s.subject_name, dm.department_name, d.description) like '%" + propertySearch.get("searchText") + "%'";
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

        System.out.println(qr);

        query = em.createNativeQuery(qr, "DocumentResultMapping");

        return query.getResultList();
    }

    @Override
    public int getCountDocument(HashMap<String, String> propertySearch) {
        qr = "SELECT d.id AS id, d.document_name AS documentName, d.keyword AS keyword,d.topic_type AS topicType, " +
                "d.document_type AS documentType, d.status AS STATUS, d.lecturer_code AS lecturerCode, " +
                "l.title AS title, u.first_name AS firstName, u.last_name AS lastName, d.department_id AS departmentId, " +
                "dm.department_name AS departmentName, d.subject_id AS subjectId, s.subject_name AS subjectName, " +
                "d.description AS description, d.views_count AS viewsCount, " +
                "d.downloads_count AS downloadsCount, d.is_copyright_warning AS isCopyrightWarning, " +
                "d.user_created AS userCreated, d.date_created AS dateCreated, d.user_updated AS userUpdated, " +
                "d.date_updated AS dateUpdated " +
                "FROM document AS d " +
                "LEFT JOIN lecturer AS l ON d.lecturer_code = l.lecturer_code " +
                "LEFT JOIN USER AS u ON d.lecturer_code = u.username " +
                "LEFT JOIN department AS dm ON d.department_id = dm.id " +
                "LEFT JOIN SUBJECT AS s  ON d.subject_id = s.id  " +
                "Where 1 = 1 ";

        if (propertySearch.get("topicTye") != null) {
            qr += " AND d.topic_type = " + propertySearch.get("topicTye");
        }
        if (propertySearch.get("departmentId") != null) {
            qr += " AND d.department_id = " + propertySearch.get("departmentId");
        }
        if (propertySearch.get("lecturerCode") != null) {
            qr += " AND d.lecturer_code = '" + propertySearch.get("lecturerCode") + "'";
        }
        if (propertySearch.get("subjectId") != null) {
            qr += " AND d.subject_id = " + propertySearch.get("subjectId");
        }
        if (propertySearch.get("type") != null) {
            qr += " AND d.document_type = " + propertySearch.get("type");
        }
        if (propertySearch.get("status") != null) {
            qr += " AND d.status = " + propertySearch.get("status");
        }
        if (propertySearch.get("student") != null) {
            qr += " AND d.status = 3";
        }
        if (propertySearch.get("userLogin") != null) {
            qr += " AND (d.status = 3 OR d.lecturer_code = '" + propertySearch.get("userLogin") + "')";
        }
        if (propertySearch.get("favourite") != null && propertySearch.get("favourite") != "") {
            qr += " AND d.id IN (" + propertySearch.get("favourite") + ") ";
        }
        if (propertySearch.get("searchText") != null) {
            qr += " AND CONCAT_WS('', d.lecturer_code, u.first_name, u.first_name, d.document_name, d.keyword," +
                    " s.subject_name, dm.department_name, d.description) like '%" + propertySearch.get("searchText") + "%'";
        }

        query = em.createNativeQuery(qr, "DocumentResultMapping");

        List<DocumentResult> list = query.getResultList();

        return list.size();
    }

    @Override
    public boolean deleteDocument(int[] ids) {
        qr = "DELETE FROM document WHERE ";

        String qr2 = "id IN (''";
        for (int i = 0; i < ids.length; i++) {
            qr2 += ", '" + ids[i] + "'";
        }

        query = em.createNativeQuery(qr + qr2 + ")");

        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("deleteDocument Lỗi: " + e);
            return false;
        }

        return true;
    }
}
