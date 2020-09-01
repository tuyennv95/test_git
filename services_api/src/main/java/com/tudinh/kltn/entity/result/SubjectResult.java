package com.tudinh.kltn.entity.result;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubjectResult {

    private int id;

    private String subjectCode;

    private String subjectName;

    private int departmentId;

    private String departmentName;

    private String rangeIds;

    private int type;

    private String description;
}
