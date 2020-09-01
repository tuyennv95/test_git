package com.tudinh.kltn.controller;

import com.tudinh.kltn.entity.result.SearchResult;
import com.tudinh.kltn.entity.result.StudentResult;
import com.tudinh.kltn.service.StudentService;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    StudentService studentService;

    @PostMapping("")
    public ResponseEntity<SearchResult<StudentResult>> getStudentResultList(@RequestBody HashMap<String, String> propertySearch) {
        System.out.println(propertySearch);

        SearchResult<StudentResult> searchResult = new SearchResult<>();
        searchResult.setItems(studentService.getStudentsList(propertySearch));
        searchResult.setTotalRecord(studentService.getCountStudent(propertySearch));

        return new ResponseEntity<>(searchResult, HttpStatus.OK);
    }

    @GetMapping("/{code}")
    public StudentResult getStudentResult(@PathVariable("code") String code) {
        return studentService.getStudentByCode(code);
    }

    @PostMapping(value = "/create")
    public boolean createStudent(@RequestBody StudentResult studentResult) {
        System.out.println(studentResult);
        StudentResult student = studentService.getStudentByCode(studentResult.getStudentCode());
        if (student != null) {
            System.out.println(student.getStudentCode() + " đã tồn tại");
            return false;
        } else {
            return studentService.createStudent(studentResult);
        }
    }

    @PutMapping("/update")
    public boolean updateStudent(@RequestBody StudentResult studentResult) {
        System.out.println(studentResult);
        StudentResult student = studentService.getStudentByCode(studentResult.getStudentCode());
        if (student == null) {
            System.out.println(studentResult.getStudentCode() + " không tồn tại");
            return false;
        } else {
            return studentService.updateStudent(studentResult);
        }
    }

    @PostMapping(value = "/upload")
    public String uploadDocument(@RequestParam("file") MultipartFile file) throws Exception {
        if (file == null) {
            throw new RuntimeException("You must select the a file for uploading");
        }

        XSSFWorkbook workbook = new XSSFWorkbook(file.getInputStream());
        XSSFSheet worksheet = workbook.getSheetAt(0);

        String classCode = worksheet.getRow(0).getCell(0).toString();
        System.out.println(classCode);

        StudentResult studentResult = new StudentResult();

        for (int i = 4; i < worksheet.getPhysicalNumberOfRows(); i++) {
            XSSFRow row = worksheet.getRow(i);

            String a = row.getCell(2).toString();
            if (a == null || a == "") {
                break;
            }

            studentResult.setStudentCode(row.getCell(2).getRawValue());
            studentResult.setFirstName(row.getCell(3).toString());
            studentResult.setLastName(row.getCell(4).toString());

            if (row.getCell(5).toString() == "Nam") {
                studentResult.setGender(1);
            } else {
                studentResult.setGender(2);
            }

            studentResult.setBirthday(row.getCell(6).getDateCellValue());
            studentResult.setAddress(row.getCell(7).toString());
            studentResult.setEmail(row.getCell(8).toString());
            studentResult.setPhoneNumber(row.getCell(9).toString());
            studentResult.setPassword(row.getCell(10).getRawValue());
            studentResult.setClassCode(classCode);
            studentResult.setRole(3);

            System.out.println(studentResult.toString());
            studentService.createStudent(studentResult);
        }

        return "1";
    }

    @PostMapping("/delete")
    public boolean deleteStudent(@RequestBody String[] codes) {
        return studentService.deleteStudent(codes);
    }
}