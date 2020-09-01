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
public class DocumentResult {

    private int id;

    private String documentName;

    private int topicType;

    private int documentType;

    private String keyword;

    private int status;

    private String lecturerCode;

    private String title; // chức danh

    private String firstName;

    private String lastName;

    private int departmentId;

    private String departmentName;

    private int subjectId;

    private String subjectName;

    private String description;

    private int viewsCount;

    private int downloadsCount;

    private boolean isCopyrightWarning;

    private String userCreated;

    private Date dateCreated;

    private String userUpdated;

    private Date dateUpdated;
}
