package com.tudinh.kltn.controller;

import com.tudinh.kltn.entity.Range;
import com.tudinh.kltn.entity.result.SearchResult;
import com.tudinh.kltn.service.RangeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/range")
public class RangeController {

    @Autowired
    RangeService rangeService;

    @PostMapping("")
    public ResponseEntity<SearchResult<Range>> getRangesList(@RequestBody HashMap<String, String> propertySearch) {
        System.out.println(propertySearch);

        SearchResult<Range> searchResult = new SearchResult<>();
        searchResult.setItems(rangeService.getRangesList(propertySearch));
        searchResult.setTotalRecord(rangeService.getCountRange(propertySearch));

        return new ResponseEntity<>(searchResult, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Range getRange(@PathVariable("id") int id) {
        return rangeService.getRangeById(id);
    }

    @PostMapping(value = "/create")
    public Range createRange(@RequestBody Range range) {
        return rangeService.createRange(range);
    }

    @PutMapping("/update")
    public boolean updateRange(@RequestBody Range range) {
        return rangeService.updateRange(range);
    }

    @PostMapping("/delete")
    public boolean deleteRange(@RequestBody int[] ids) {
        return rangeService.deleteRange(ids);
    }
}