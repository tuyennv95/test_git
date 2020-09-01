package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.Student;
import com.tudinh.kltn.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer>, StudentRepositoryCustom {
}
