package com.tudinh.kltn.entity.result;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LecturerResult {
    private String lecturerCode;

    private int departmentId;

    private String title;

    private String position;

    private String description;

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
