package com.tudinh.kltn.entity;

import com.tudinh.kltn.entity.result.StudentResult;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SqlResultSetMapping(
        name = "StudentResultMapping",
        classes = @ConstructorResult(
                targetClass = StudentResult.class,
                columns = {
                        @ColumnResult(name = "studentCode"),
                        @ColumnResult(name = "classCode"),
                        @ColumnResult(name = "password"),
                        @ColumnResult(name = "firstName"),
                        @ColumnResult(name = "lastName"),
                        @ColumnResult(name = "gender", type = Integer.class),
                        @ColumnResult(name = "birthday"),
                        @ColumnResult(name = "address"),
                        @ColumnResult(name = "email"),
                        @ColumnResult(name = "phoneNumber"),
                        @ColumnResult(name = "role", type = Integer.class),
                }))
@Table(name = "student")
public class Student {
    @Id
    @Column(name = "student_code")
    private String studentCode;

    @Basic
    @Column(name = "class_code")
    private String classCode;
}
