package com.tudinh.kltn.entity;

import com.tudinh.kltn.entity.result.LecturerSubjectResult;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SqlResultSetMapping(
        name = "LecturerSubjectResultMapping",
        classes = @ConstructorResult(
                targetClass = LecturerSubjectResult.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "lecturerCode"),
                        @ColumnResult(name = "subjectId"),
                        @ColumnResult(name = "title"),
                        @ColumnResult(name = "firstName"),
                        @ColumnResult(name = "lastName"),
                        @ColumnResult(name = "subjectName"),
                }))
@Table(name = "lecturer_subject")
public class LecturerSubject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "lecturer_code")
    private String lecturerCode;

    @Basic
    @Column(name = "subject_id")
    private int subjectId;
}
