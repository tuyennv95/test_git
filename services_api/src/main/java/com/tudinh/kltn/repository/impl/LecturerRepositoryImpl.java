package com.tudinh.kltn.repository.impl;

import com.tudinh.kltn.entity.result.LecturerResult;
import com.tudinh.kltn.repository.LecturerRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;

public class LecturerRepositoryImpl implements LecturerRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    String qr;
    Query query;

    @Override
    public List<LecturerResult> getLecturersList(HashMap<String, String> propertySearch) {
        qr = "SELECT l.lecturer_code AS lecturerCode , l.department_id AS departmentId," +
                "l.title AS title, l.position AS POSITION, l.description AS description," +
                "u.password AS password, u.first_name AS firstName, u.last_name AS lastName, " +
                "u.gender AS gender, u.birthday AS birthday, u.address AS address, u.email AS email, " +
                "u.phone_number AS phoneNumber, u.role AS role" +
                " FROM USER AS u, lecturer AS l" +
                " WHERE u.username = l.lecturer_code AND u.role = 2 ";

        if (propertySearch.get("departmentId") != null) {
            qr += " AND department_id = " + propertySearch.get("departmentId");
        }
        if (propertySearch.get("searchText") != null) {
            qr += " AND CONCAT_WS('', l.lecturer_code, u.first_name, u.last_name) like '%"
                    + propertySearch.get("searchText") + "%' ";
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

        query = em.createNativeQuery(qr, "LecturerResultMapping");

        return query.getResultList();
    }

    @Override
    public int getCountLecturer(HashMap<String, String> propertySearch) {
        qr = "SELECT l.lecturer_code AS lecturerCode , l.department_id AS departmentId," +
                "l.title AS title, l.position AS POSITION, l.description AS description," +
                "u.password AS password, u.first_name AS firstName, u.last_name AS lastName, " +
                "u.gender AS gender, u.birthday AS birthday, u.address AS address, u.email AS email, " +
                "u.phone_number AS phoneNumber, u.role AS role" +
                " FROM USER AS u, lecturer AS l" +
                " WHERE u.username = l.lecturer_code AND u.role = 2 ";

        if (propertySearch.get("departmentId") != null) {
            qr += " AND department_id = " + propertySearch.get("departmentId");
        }
        if (propertySearch.get("searchText") != null) {
            qr += " AND CONCAT_WS('', l.lecturer_code, u.first_name, u.last_name) like '%"
                    + propertySearch.get("searchText") + "%' ";
        }

        query = em.createNativeQuery(qr, "LecturerResultMapping");

        List<LecturerResult> list = query.getResultList();

        return list.size();
    }

    @Override
    public LecturerResult getLecturerByCode(String code) {
        qr = "SELECT l.lecturer_code AS lecturerCode , l.department_id AS departmentId," +
                "l.title AS title, l.position AS POSITION, l.description AS description," +
                "u.password AS password, u.first_name AS firstName, u.last_name AS lastName, " +
                "u.gender AS gender, u.birthday AS birthday, u.address AS address, u.email AS email, " +
                "u.phone_number AS phoneNumber, u.role AS role" +
                " FROM USER AS u, lecturer AS l" +
                " WHERE u.username = l.lecturer_code AND l.lecturer_code = ?0";

        query = em.createNativeQuery(qr, "LecturerResultMapping");

        query.setParameter(0, code);

        try {
            query.getSingleResult();
        } catch (Exception e) {
            System.out.println("getLecturerByCode Lỗi: " + e);
            return null;
        }

        return (LecturerResult) query.getSingleResult();
    }

    @Override
    public boolean createLecturer(LecturerResult lecturerResult) {
        qr = "INSERT INTO lecturer (`lecturer_code`, `department_id`, `description`, `position`, `title`)" +
                "VALUES (?0, ?1, ?2, ?3, ?4);";

        query = em.createNativeQuery(qr);

        query.setParameter(0, lecturerResult.getLecturerCode());
        query.setParameter(1, lecturerResult.getDepartmentId());
        query.setParameter(2, lecturerResult.getDescription());
        query.setParameter(3, lecturerResult.getPosition());
        query.setParameter(4, lecturerResult.getTitle());

        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("createLecturer Lỗi: " + e);
            return false;
        }

        return true;
    }

    @Override
    public boolean updateLecturer(LecturerResult lecturerResult) {
        qr = "UPDATE lecturer SET `department_id` = ?0, `description` = ?1, " +
                "`position` = ?2, `title` = ?3 " +
                "WHERE (`lecturer_code` = ?4);";

        query = em.createNativeQuery(qr);

        query.setParameter(0, lecturerResult.getDepartmentId());
        query.setParameter(1, lecturerResult.getDescription());
        query.setParameter(2, lecturerResult.getPosition());
        query.setParameter(3, lecturerResult.getTitle());
        query.setParameter(4, lecturerResult.getLecturerCode());

        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("updateLecturer Lỗi: " + e);
            return false;
        }

        return true;
    }

    @Override
    public boolean deleteLecturer(String[] codes) {
        qr = "DELETE FROM lecturer WHERE ";

        String qr2 = "lecturer_code IN (''";
        for (int i = 0; i < codes.length; i++) {
            qr2 += ", '" + codes[i] + "'";
        }

        query = em.createNativeQuery(qr + qr2 + ")");

        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("deleteLecturer Lỗi: " + e);
            return false;
        }

        return true;
    }

}
