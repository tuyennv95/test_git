package com.tudinh.kltn.controller;

import com.tudinh.kltn.entity.Student;
import com.tudinh.kltn.entity.result.LecturerResult;
import com.tudinh.kltn.entity.result.StudentResult;
import com.tudinh.kltn.entity.result.UserResult;
import com.tudinh.kltn.service.LecturerService;
import com.tudinh.kltn.service.StudentService;
import com.tudinh.kltn.service.TokenAuthenticationService;
import com.tudinh.kltn.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    StudentService studentService;

    @Autowired
    LecturerService lecturerService;

    @GetMapping(value = "/login")
    public ResponseEntity<String> login(@RequestParam("username") String username, @RequestParam("password") String password) {
        //get user by data
        UserResult user = userService.getUserByUsername(username);

        System.out.println(user.toString());

        //Check user
        if (user == null || !user.getPassword().equals(password)) {
            return ResponseEntity.ok()
                    .header("content-type", "application/json")
                    .body("{\"result\":\"ERROR\"}");
        }

        //login thành công
        String token = TokenAuthenticationService.createToken(username);

        if (user.getRole() == 3) {
            StudentResult student = studentService.getStudentByCode(user.getUsername());
            return ResponseEntity.ok()
                    .header("Authorization", "Bearer " + token)
                    .header("content-type", "application/json")
                    .body("{\"result\":\"" + token + "\"," +
                            "\"user\":\"" + student + "\"}");
        }

        LecturerResult lecturer = lecturerService.getLecturerByCode(user.getUsername());
        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + token)
                .header("content-type", "application/json")
                .body("{\"result\":\"" + token + "\"," +
                        "\"user\":\"" + lecturer.toString() + "\"}");

        //String authorizationString = JWTClient.postLogin(username, password);
    }
}