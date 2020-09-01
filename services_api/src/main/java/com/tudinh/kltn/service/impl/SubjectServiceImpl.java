package com.tudinh.kltn.service.impl;

import com.tudinh.kltn.entity.Subject;
import com.tudinh.kltn.entity.result.SubjectResult;
import com.tudinh.kltn.repository.SubjectRepository;
import com.tudinh.kltn.service.LecturerSubjectService;
import com.tudinh.kltn.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class SubjectServiceImpl implements SubjectService {

    @Autowired
    SubjectRepository subjectRepository;

    @Override
    public List<SubjectResult> getSubjectsList(HashMap<String, String> propertySearch) {
        return subjectRepository.getSubjectsList(propertySearch);
    }

    @Override
    public int getCountSubject(HashMap<String, String> propertySearch) {
        return subjectRepository.getCountSubject(propertySearch);
    }

    @Override
    public Subject getSubjectById(int id) {
        return subjectRepository.findById(id).get();
    }

    @Override
    public Subject createSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    @Override
    public boolean updateSubject(Subject subject) {
        Subject _subject = getSubjectById(subject.getId());

        if (_subject.getId() > 0) {
            subjectRepository.save(subject);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteSubject(int[] ids) {
        return subjectRepository.deleteSubject(ids);
    }
}

