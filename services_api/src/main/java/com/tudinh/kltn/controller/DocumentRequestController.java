package com.tudinh.kltn.controller;

import com.tudinh.kltn.entity.DocumentRequest;
import com.tudinh.kltn.entity.result.SearchResult;
import com.tudinh.kltn.entity.result.DocumentRequestResult;
import com.tudinh.kltn.service.DocumentRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/document-request")
public class DocumentRequestController {

    @Autowired
    DocumentRequestService documentRequestService;

    @PostMapping("")
    public ResponseEntity<SearchResult<DocumentRequestResult>> getDocumentRequestsList(@RequestBody HashMap<String, String> propertySearch) {
        System.out.println(propertySearch);

        SearchResult<DocumentRequestResult> searchResult = new SearchResult<>();
        searchResult.setItems(documentRequestService.getDocumentRequestsList(propertySearch));
        searchResult.setTotalRecord(documentRequestService.getCountDocumentRequest(propertySearch));

        return new ResponseEntity<>(searchResult, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public DocumentRequest getDocumentRequest(@PathVariable("id") int id) {
        return documentRequestService.getDocumentRequestById(id);
    }

    @PostMapping(value = "/create")
    public DocumentRequest createDocumentRequest(@RequestBody DocumentRequestResult documentRequest) {
        return documentRequestService.createDocumentRequest(new DocumentRequest(documentRequest));
    }

    @PutMapping("/update")
    public boolean updateDocumentRequest(@RequestBody DocumentRequestResult documentRequest) {
        return documentRequestService.updateDocumentRequest(new DocumentRequest(documentRequest));
    }

    @PostMapping("/delete")
    public boolean deleteDocumentRequest(@RequestBody int[] ids) {
        return documentRequestService.deleteDocumentRequest(ids);
    }
}