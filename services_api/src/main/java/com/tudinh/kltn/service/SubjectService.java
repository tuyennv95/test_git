package com.tudinh.kltn.service;

import com.tudinh.kltn.entity.Subject;
import com.tudinh.kltn.entity.result.SubjectResult;

import java.util.HashMap;
import java.util.List;

public interface SubjectService {

    List<SubjectResult> getSubjectsList(HashMap<String, String> propertySearch);

    int getCountSubject(HashMap<String, String> propertySearch);

    Subject getSubjectById(int id);

    Subject createSubject(Subject subject);

    boolean updateSubject(Subject subject);

    boolean deleteSubject(int[] ids);
}