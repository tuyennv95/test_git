package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.result.LecturerResult;

import java.util.HashMap;
import java.util.List;


public interface LecturerRepositoryCustom {

    List<LecturerResult> getLecturersList(HashMap<String, String> propertySearch);

    int getCountLecturer(HashMap<String, String> propertySearch);

    LecturerResult getLecturerByCode(String code);

    boolean createLecturer(LecturerResult lecturerResult);

    boolean updateLecturer(LecturerResult lecturerResult);

    boolean deleteLecturer(String[] codes);

}
