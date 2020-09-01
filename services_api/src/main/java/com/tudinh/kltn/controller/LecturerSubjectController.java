package com.tudinh.kltn.controller;

import com.tudinh.kltn.entity.result.LecturerSubjectResult;
import com.tudinh.kltn.service.LecturerSubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/lecturer-subject")
public class LecturerSubjectController {

    @Autowired
    LecturerSubjectService lecturerSubjectService;

    @PostMapping("")
    public List<LecturerSubjectResult> getLecturerSubjectsList(@RequestBody HashMap<String, String> propertySearch) {
        return lecturerSubjectService.getLecturerSubjectsList(propertySearch);
    }

    @PostMapping(value = "/update/{subjectId}")
    public boolean updateLecturerSubject(@PathVariable("subjectId") int subjectId,
                                         @RequestBody String[] lecturerCodes) {
        return lecturerSubjectService.updateLecturerSubject(subjectId, lecturerCodes);
    }
}