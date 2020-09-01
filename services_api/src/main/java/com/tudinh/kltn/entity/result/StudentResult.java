package com.tudinh.kltn.entity.result;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentResult {
    private String studentCode;

    private String classCode;

    private String password;

    private String firstName;

    private String lastName;

    private int gender;

    private Date birthday;

    private String address;

    private String email;

    private String phoneNumber;

    private int role;
}
