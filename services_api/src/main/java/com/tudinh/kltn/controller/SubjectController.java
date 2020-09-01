package com.tudinh.kltn.controller;

import com.tudinh.kltn.entity.Subject;
import com.tudinh.kltn.entity.result.SearchResult;
import com.tudinh.kltn.entity.result.SubjectResult;
import com.tudinh.kltn.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/subject")
public class SubjectController {

    @Autowired
    SubjectService subjectService;

    @PostMapping("")
    public ResponseEntity<SearchResult<SubjectResult>> getSubjectsList(@RequestBody HashMap<String, String> propertySearch) {
        System.out.println(propertySearch);

        SearchResult<SubjectResult> searchResult = new SearchResult<>();
        searchResult.setItems(subjectService.getSubjectsList(propertySearch));
        searchResult.setTotalRecord(subjectService.getCountSubject(propertySearch));

        return new ResponseEntity<>(searchResult, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Subject getSubject(@PathVariable("id") int id) {
        return subjectService.getSubjectById(id);
    }

    @PostMapping(value = "/create")
    public Subject createSubject(@RequestBody SubjectResult subject) {
        return subjectService.createSubject(new Subject(subject));
    }

    @PutMapping("/update")
    public boolean updateSubject(@RequestBody SubjectResult subject) {
        return subjectService.updateSubject(new Subject(subject));
    }

    @PostMapping("/delete")
    public boolean deleteSubject(@RequestBody int[] ids) {
        return subjectService.deleteSubject(ids);
    }
}