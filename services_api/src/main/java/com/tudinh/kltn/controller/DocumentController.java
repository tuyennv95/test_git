package com.tudinh.kltn.controller;

import com.tudinh.kltn.entity.Document;
import com.tudinh.kltn.entity.result.SearchResult;
import com.tudinh.kltn.entity.result.DocumentResult;
import com.tudinh.kltn.service.DocumentService;
import com.tudinh.kltn.service.TokenAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/document")
public class DocumentController {

    @Autowired
    DocumentService documentService;

    @PostMapping("")
    public ResponseEntity<SearchResult<DocumentResult>> getDocumentsList(HttpServletRequest request,
                                                                         @RequestBody HashMap<String, String> propertySearch) {
        System.out.println(propertySearch);

        SearchResult<DocumentResult> searchResult = new SearchResult<>();
        searchResult.setItems(documentService.getDocumentsList(propertySearch));
        searchResult.setTotalRecord(documentService.getCountDocument(propertySearch));

        return new ResponseEntity<>(searchResult, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Document getDocument(@PathVariable("id") int id) {
        return documentService.getDocumentById(id, 1);
    }

    @PostMapping(value = "/create")
    public Document createDocument(@RequestBody DocumentResult documentResult) {
        System.out.println("create document: " + documentResult.toString());
        return documentService.createDocument(new Document(documentResult));
    }

    @PutMapping("/update")
    public boolean updateDocument(@RequestBody DocumentResult documentResult) {
        System.out.println("update document: " + documentResult.toString());
        return documentService.updateDocument(new Document(documentResult));
    }

    @PostMapping("/delete")
    public boolean deleteDocument(@RequestBody int[] ids) {
        return documentService.deleteDocument(ids);
    }
}