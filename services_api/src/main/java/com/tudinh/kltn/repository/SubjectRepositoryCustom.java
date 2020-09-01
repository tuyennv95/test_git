package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.result.SubjectResult;

import java.util.HashMap;
import java.util.List;


public interface SubjectRepositoryCustom {

    List<SubjectResult> getSubjectsList(HashMap<String, String> propertySearch);

    int getCountSubject(HashMap<String, String> propertySearch);

    boolean deleteSubject(int[] ids);

}
