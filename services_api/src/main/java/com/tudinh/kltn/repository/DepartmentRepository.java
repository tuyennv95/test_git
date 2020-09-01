package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Integer>, DepartmentRepositoryCustom {
}
