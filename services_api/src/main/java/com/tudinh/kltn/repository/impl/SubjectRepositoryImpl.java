package com.tudinh.kltn.repository.impl;

import com.tudinh.kltn.entity.Range;
import com.tudinh.kltn.entity.result.SubjectResult;
import com.tudinh.kltn.repository.SubjectRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;

public class SubjectRepositoryImpl implements SubjectRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    Query query;
    String qr;

    @Override
    public List<SubjectResult> getSubjectsList(HashMap<String, String> propertySearch) {
        qr = "SELECT s.id, s.subject_code AS subjectCode, s.subject_name AS subjectName, s.department_id AS departmentId, " +
                "s.range_ids AS rangeIds, s.type, s.description, d.department_name AS departmentName" +
                " FROM SUBJECT AS s" +
                " LEFT JOIN department AS d ON s.department_id = d.id " +
                " WHERE 1=1 ";

        if (propertySearch.get("departmentId") != null) {
            qr += " AND s.department_id = " + propertySearch.get("departmentId");
        }
        if (propertySearch.get("rangeId") != null) {
            qr += " AND s.range_ids like '%" + propertySearch.get("rangeId") + "%'";
        }
        if (propertySearch.get("type") != null) {
            qr += " AND s.type = " + propertySearch.get("type");
        }
        if (propertySearch.get("searchText") != null) {
            qr += " AND CONCAT_WS('', s.subject_code, s.subject_name) like '%" + propertySearch.get("searchText") + "%'";
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

        query = em.createNativeQuery(qr, "SubjectResultMapping");

        return query.getResultList();
    }

    @Override
    public int getCountSubject(HashMap<String, String> propertySearch) {
        qr = "SELECT s.id, s.subject_code AS subjectCode, s.subject_name AS subjectName, s.department_id AS departmentId, " +
                "s.range_ids AS rangeIds, s.type, s.description, d.department_name AS departmentName" +
                " FROM SUBJECT AS s" +
                " LEFT JOIN department AS d ON s.department_id = d.id " +
                " WHERE 1=1 ";

        if (propertySearch.get("departmentId") != null) {
            qr += " AND s.department_id = " + propertySearch.get("departmentId");
        }
        if (propertySearch.get("rangeId") != null) {
            qr += " AND s.range_ids like '%" + propertySearch.get("rangeId") + "%'";
        }
        if (propertySearch.get("type") != null) {
            qr += " AND s.type = " + propertySearch.get("type");
        }
        if (propertySearch.get("searchText") != null) {
            qr += " AND CONCAT_WS('', s.subject_code, s.subject_name) like '%" + propertySearch.get("searchText") + "%'";
        }

        query = em.createNativeQuery(qr, "SubjectResultMapping");
        List<SubjectResult> list = query.getResultList();

        return list.size();
    }

    @Override
    public boolean deleteSubject(int[] ids) {
        qr = "DELETE FROM subject WHERE ";

        String qr2 = "id IN (0";
        for (int i = 0; i < ids.length; i++) {
            qr2 += ", " + ids[i];
        }

        query = em.createNativeQuery(qr + qr2 + ")");

        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("deleteSubject Lỗi: " + e);
            return false;
        }

        //---------------------------------
        qr = "DELETE FROM lecturer_subject WHERE ";

        qr2 = "subject_id IN (0";
        for (int i = 0; i < ids.length; i++) {
            qr2 += ", " + ids[i];
        }

        query = em.createNativeQuery(qr + qr2 + ")");

        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("deleteLecturerSubject Lỗi: " + e);
            return false;
        }

        return true;
    }
}
