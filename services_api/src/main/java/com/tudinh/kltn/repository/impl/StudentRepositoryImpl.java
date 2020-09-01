package com.tudinh.kltn.repository.impl;

import com.tudinh.kltn.entity.result.StudentResult;
import com.tudinh.kltn.repository.StudentRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;

public class StudentRepositoryImpl implements StudentRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    String qr;
    Query query;

    @Override
    public List<StudentResult> getStudentsList(HashMap<String, String> propertySearch) {
        qr = "SELECT l.student_code AS studentCode , l.class_code AS classCode," +
                "u.password AS password, u.first_name AS firstName, u.last_name AS lastName, " +
                "u.gender AS gender, u.birthday AS birthday, u.address AS address, u.email AS email, " +
                "u.phone_number AS phoneNumber, u.role AS role" +
                " FROM USER AS u, student AS l" +
                " WHERE u.username = l.student_code ";


        if (propertySearch.get("searchText") != null) {
            qr += " AND CONCAT_WS('', l.student_code, l.class_code, u.first_name, u.last_name) like '%"
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

        query = em.createNativeQuery(qr, "StudentResultMapping");

        return query.getResultList();
    }

    @Override
    public int getCountStudent(HashMap<String, String> propertySearch) {
        qr = "SELECT l.student_code AS studentCode , l.class_code AS classCode," +
                "u.password AS password, u.first_name AS firstName, u.last_name AS lastName, " +
                "u.gender AS gender, u.birthday AS birthday, u.address AS address, u.email AS email, " +
                "u.phone_number AS phoneNumber, u.role AS role" +
                " FROM USER AS u, student AS l" +
                " WHERE u.username = l.student_code ";


        if (propertySearch.get("searchText") != null) {
            qr += " AND CONCAT_WS('', l.student_code, l.class_code, u.first_name, u.last_name) like '%"
                    + propertySearch.get("searchText") + "%' ";
        }

        query = em.createNativeQuery(qr, "StudentResultMapping");
        List<StudentResult> list = query.getResultList();

        return list.size();
    }

    @Override
    public StudentResult getStudentByCode(String code) {
        qr = "SELECT l.student_code AS studentCode , l.class_code AS classCode," +
                "u.password AS password, u.first_name AS firstName, u.last_name AS lastName, " +
                "u.gender AS gender, u.birthday AS birthday, u.address AS address, u.email AS email, " +
                "u.phone_number AS phoneNumber, u.role AS role" +
                " FROM USER AS u, student AS l" +
                " WHERE u.username = l.student_code AND l.student_code = ?0";

        query = em.createNativeQuery(qr, "StudentResultMapping");

        query.setParameter(0, code);

        try {
            query.getSingleResult();
        } catch (Exception e) {
            System.out.println("getStudentByCode Lỗi: " + e);
            return null;
        }

        return (StudentResult) query.getSingleResult();
    }

    @Override
    public boolean createStudent(StudentResult studentResult) {
        qr = "INSERT INTO student (`student_code`, `class_code`)" +
                "VALUES (?0, ?1);";

        query = em.createNativeQuery(qr);

        query.setParameter(0, studentResult.getStudentCode());
        query.setParameter(1, studentResult.getClassCode());


        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("createStudent Lỗi: " + e);
            return false;
        }

        return true;
    }

    @Override
    public boolean updateStudent(StudentResult studentResult) {
        qr = "UPDATE student SET `class_code` = ?0 " +
                "WHERE (`student_code` = ?1);";

        query = em.createNativeQuery(qr);

        query.setParameter(0, studentResult.getClassCode());
        query.setParameter(1, studentResult.getStudentCode());

        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("updateStudent Lỗi: " + e);
            return false;
        }

        return true;
    }

    @Override
    public boolean deleteStudent(String[] codes) {
        qr = "DELETE FROM student WHERE ";

        String qr2 = "student_code IN (0";
        for (int i = 0; i < codes.length; i++) {
            qr2 += ", " + codes[i];
        }

        query = em.createNativeQuery(qr + qr2 + ")");

        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("deleteStudent Lỗi: " + e);
            return false;
        }

        return true;
    }

}
