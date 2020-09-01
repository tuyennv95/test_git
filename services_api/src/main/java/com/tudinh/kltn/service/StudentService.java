package com.tudinh.kltn.service;

import com.tudinh.kltn.entity.result.StudentResult;

import java.util.HashMap;
import java.util.List;

public interface StudentService {

    List<StudentResult> getStudentsList(HashMap<String, String> propertySearch);

    int getCountStudent(HashMap<String, String> propertySearch);

    StudentResult getStudentByCode(String code);

    boolean createStudent(StudentResult studentResult);

    boolean updateStudent(StudentResult studentResult);

    boolean deleteStudent(String[] codes);
}