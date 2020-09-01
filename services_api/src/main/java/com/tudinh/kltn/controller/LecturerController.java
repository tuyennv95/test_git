package com.tudinh.kltn.controller;

import com.tudinh.kltn.entity.result.LecturerResult;
import com.tudinh.kltn.entity.result.SearchResult;
import com.tudinh.kltn.service.LecturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/lecturer")
public class LecturerController {

    @Autowired
    LecturerService lecturerService;

    @PostMapping("")
    public ResponseEntity<SearchResult<LecturerResult>> getLecturerResultList(@RequestBody HashMap<String, String> propertySearch) {
        System.out.println(propertySearch);

        SearchResult<LecturerResult> searchResult = new SearchResult<>();
        searchResult.setItems(lecturerService.getLecturersList(propertySearch));
        searchResult.setTotalRecord(lecturerService.getCountLecturer(propertySearch));

        return new ResponseEntity<>(searchResult, HttpStatus.OK);
    }
    @GetMapping("/{code}")
    public LecturerResult getLecturerResult(@PathVariable("code") String code) {
        return lecturerService.getLecturerByCode(code);
    }

    @PostMapping(value = "/create")
    public boolean createLecturer(@RequestBody LecturerResult lecturerResult) {
        System.out.println(lecturerResult);
        LecturerResult lecturer = lecturerService.getLecturerByCode(lecturerResult.getLecturerCode());
        if (lecturer != null) {
            System.out.println(lecturer.getLecturerCode() + " đã tồn tại");
            return false;
        } else {
            return lecturerService.createLecturer(lecturerResult);
        }
    }

    @PutMapping("/update")
    public boolean updateLecturer(@RequestBody LecturerResult lecturerResult) {
        System.out.println(lecturerResult);
        LecturerResult lecturer = lecturerService.getLecturerByCode(lecturerResult.getLecturerCode());
        if (lecturer == null) {
            System.out.println(lecturerResult.getLecturerCode() + " không tồn tại");
            return false;
        } else {
            return lecturerService.updateLecturer(lecturerResult);
        }
    }

    @PostMapping("/delete")
    public boolean deleteLecturer(@RequestBody String[] codes) {
        return lecturerService.deleteLecturer(codes);
    }
}