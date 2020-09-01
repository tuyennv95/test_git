package com.tudinh.kltn.repository.impl;

import com.tudinh.kltn.entity.Department;
import com.tudinh.kltn.repository.DepartmentRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

public class DepartmentRepositoryImpl implements DepartmentRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    Query query;
    String qr;

    @Override
    public List<Department> getDepartmentsList() {
        qr = "SELECT id, department_code AS departmentCode, department_name AS departmentName, " +
                "description" +
                " FROM department";

        query = em.createNativeQuery(qr, "DepartmentResultMapping");

        return query.getResultList();
    }

    @Override
    public Department getDepartmentById(int id) {
        qr = "SELECT id, department_code AS departmentCode, department_name AS departmentName, " +
                "description" +
                " FROM department" +
                " WHERE id = ?0";

        query = em.createNativeQuery(qr, "DepartmentResultMapping");

        query.setParameter(0, id);

        try {
            query.getSingleResult();
        } catch (Exception e) {
            System.out.println("getDepartmentById Lỗi: " + e);
            return null;
        }

        return (Department) query.getSingleResult();
    }

    @Override
    public boolean createDepartment(Department department) {
        qr = "INSERT INTO department (`department_code`, `department_name`, " +
                "`description`) VALUES (?0, ?1, ?2);";

        query = em.createNativeQuery(qr);

        query.setParameter(0, department.getDepartmentCode());
        query.setParameter(1, department.getDepartmentName());
        query.setParameter(2, department.getDescription());


        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("createDepartment Lỗi: " + e);
            return false;
        }

        return true;
    }

    @Override
    public boolean updateDepartment(Department department) {
        qr = "UPDATE department SET `department_code` = ?0, `department_name` = ?1, `description` = ?2" +
                " WHERE (`id` = ?3);";

        query = em.createNativeQuery(qr);

        query.setParameter(0, department.getDepartmentCode());
        query.setParameter(1, department.getDepartmentName());
        query.setParameter(2, department.getDescription());
        query.setParameter(3, department.getId());

        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("updateDepartment Lỗi: " + e);
            return false;
        }

        return true;
    }

    @Override
    public boolean deleteDepartment(int[] ids) {
        qr = "DELETE FROM department WHERE ";

        String qr2 = "id IN (0";
        for (int i = 0; i < ids.length; i++) {
            qr2 += ", " + ids[i];
        }

        query = em.createNativeQuery(qr + qr2 + ")");

        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("deleteDepartment Lỗi: " + e);
            return false;
        }

        return true;
    }
}
