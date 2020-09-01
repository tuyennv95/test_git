package com.tudinh.kltn.controller;

import com.tudinh.kltn.entity.DocumentReview;
import com.tudinh.kltn.entity.result.SearchResult;
import com.tudinh.kltn.service.DocumentReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/document-review")
public class DocumentReviewController {

    @Autowired
    DocumentReviewService documentReviewService;

    @PostMapping("")
    public ResponseEntity<List<DocumentReview>> getDocumentReviewsList(@RequestBody HashMap<String, String> propertySearch) {
        System.out.println(propertySearch);

        List<DocumentReview> list = documentReviewService.getDocumentReviewsList(propertySearch);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public DocumentReview getDocumentReview(@PathVariable("id") int id) {
        return documentReviewService.getDocumentReviewById(id);
    }

    @PostMapping(value = "/create")
    public DocumentReview createDocumentReview(@RequestBody DocumentReview documentReview) {
        return documentReviewService.createDocumentReview(documentReview);
    }

    @PutMapping("/update")
    public boolean updateDocumentReview(@RequestBody DocumentReview documentReview) {
        return documentReviewService.updateDocumentReview(documentReview);
    }

    @PostMapping("/delete")
    public boolean deleteDocumentReview(@RequestBody int[] ids) {
        return documentReviewService.deleteDocumentReview(ids);
    }
}