package com.tudinh.kltn.service;

import com.tudinh.kltn.entity.result.LecturerSubjectResult;

import java.util.HashMap;
import java.util.List;

public interface LecturerSubjectService {

    List<LecturerSubjectResult> getLecturerSubjectsList(HashMap<String, String> propertySearch);

    boolean updateLecturerSubject(int subjectId, String[] lecturerCodes);

}