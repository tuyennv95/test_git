package com.tudinh.kltn.service.impl;

import com.tudinh.kltn.entity.result.LecturerSubjectResult;
import com.tudinh.kltn.repository.LecturerSubjectRepository;
import com.tudinh.kltn.service.LecturerSubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class LecturerSubjectServiceImpl implements LecturerSubjectService {

    @Autowired
    LecturerSubjectRepository lecturerSubjectRepository;

    @Override
    public List<LecturerSubjectResult> getLecturerSubjectsList(HashMap<String, String> propertySearch) {
        return lecturerSubjectRepository.getLecturerSubjectsList(propertySearch);
    }

    @Override
    public boolean updateLecturerSubject(int subjectId, String[] lecturerCodes) {
        return lecturerSubjectRepository.updateLecturerSubject(subjectId, lecturerCodes);
    }
}

