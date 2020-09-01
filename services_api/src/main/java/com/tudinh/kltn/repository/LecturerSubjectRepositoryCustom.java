package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.result.LecturerSubjectResult;

import java.util.HashMap;
import java.util.List;


public interface LecturerSubjectRepositoryCustom {

    List<LecturerSubjectResult> getLecturerSubjectsList(HashMap<String, String> propertySearch);

    boolean updateLecturerSubject(int subjectId, String[] lecturerCodes);
}
