package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.result.StudentResult;

import java.util.HashMap;
import java.util.List;


public interface StudentRepositoryCustom {

    List<StudentResult> getStudentsList(HashMap<String, String> propertySearch);

    int getCountStudent(HashMap<String, String> propertySearch);

    StudentResult getStudentByCode(String code);

    boolean createStudent(StudentResult studentResult);

    boolean updateStudent(StudentResult studentResult);

    boolean deleteStudent(String[] codes);

}
