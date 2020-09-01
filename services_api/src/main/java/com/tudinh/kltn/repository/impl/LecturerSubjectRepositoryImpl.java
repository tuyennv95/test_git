package com.tudinh.kltn.repository.impl;

import com.tudinh.kltn.entity.result.LecturerSubjectResult;
import com.tudinh.kltn.repository.LecturerSubjectRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;

public class LecturerSubjectRepositoryImpl implements LecturerSubjectRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    Query query;
    String qr;

    @Override
    public List<LecturerSubjectResult> getLecturerSubjectsList(HashMap<String, String> propertySearch) {
        qr = "SELECT ls.id, ls.lecturer_code AS lecturerCode, ls.subject_id AS subjectId, l.title AS title, " +
                "u.first_name AS firstName, " +
                "u.last_name AS lastName, s.subject_name AS subjectName " +
                "FROM lecturer_subject AS ls, lecturer AS l, USER AS u, SUBJECT AS s " +
                "WHERE ls.lecturer_code = l.lecturer_code AND ls.lecturer_code = u.username AND ls.subject_id = s.id ";

        if (propertySearch.get("lecturerCode") != null) {
            qr += " AND ls.lecturer_code = '" + propertySearch.get("lecturerCode") + "'";
        }
        if (propertySearch.get("subjectId") != null) {
            qr += " AND subject_id = " + propertySearch.get("subjectId");
        }

        query = em.createNativeQuery(qr, "LecturerSubjectResultMapping");

        return query.getResultList();
    }

    @Override
    public boolean updateLecturerSubject(int subjectId, String[] lecturerCodes) {
        qr = "Delete FROM lecturer_subject WHERE (`subject_id` = ?0);";
        query = em.createNativeQuery(qr);
        query.setParameter(0, subjectId);
        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("updateLecturerSubject xóa Lỗi: " + e);
            return false;
        }

        //-------------------------

        qr = "INSERT INTO lecturer_subject (`lecturer_code`, `subject_id`) " +
                "VALUES ";
        for (int i = 0; i < lecturerCodes.length - 1; i++) {
            qr += " ('" + lecturerCodes[i] + "', " + subjectId + "), ";
        }
        qr += " ('" + lecturerCodes[lecturerCodes.length - 1] + "', " + subjectId + ") ";
        query = em.createNativeQuery(qr);
        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("updateLecturerSubject Lỗi: " + e);
            return false;
        }

        return true;
    }
}
