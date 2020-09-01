package com.tudinh.kltn.entity.result;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LecturerSubjectResult {

    private int id;

    private String lecturerCode;

    private int subjectId;

    private String title;

    private String firstName;

    private String lastName;

    private String subjectName;
}
