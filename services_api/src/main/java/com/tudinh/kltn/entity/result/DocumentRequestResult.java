package com.tudinh.kltn.entity.result;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DocumentRequestResult {
    private int id;

    private String studentCode;

    private String firstName;

    private String lastName;

    private String classCode;

    private String title;

    private String request;

    private String comment;

    private int status;
}
