package com.tudinh.kltn.service;

import com.tudinh.kltn.entity.Department;

import java.util.List;

public interface DepartmentService {

    List<Department> getDepartmentsList();

    Department getDepartmentById(int id);

    boolean createDepartment(Department department);

    boolean updateDepartment(Department department);

    boolean deleteDepartment(int[] ids);
}