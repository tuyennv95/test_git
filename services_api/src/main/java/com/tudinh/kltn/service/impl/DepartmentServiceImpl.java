package com.tudinh.kltn.service.impl;

import com.tudinh.kltn.entity.Department;
import com.tudinh.kltn.repository.DepartmentRepository;
import com.tudinh.kltn.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    DepartmentRepository departmentRepository;

    @Override
    public List<Department> getDepartmentsList() {
        return departmentRepository.getDepartmentsList();
    }

    @Override
    public Department getDepartmentById(int id) {
        return departmentRepository.getDepartmentById(id);
    }

    @Override
    public boolean createDepartment(Department department) {
        return departmentRepository.createDepartment(department);
    }

    @Override
    public boolean updateDepartment(Department department) {
        return departmentRepository.updateDepartment(department);
    }

    @Override
    public boolean deleteDepartment(int[] ids) {
        return departmentRepository.deleteDepartment(ids);
    }
}

