package com.tudinh.kltn.entity;

import com.tudinh.kltn.entity.result.LecturerResult;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SqlResultSetMapping(
        name = "LecturerResultMapping",
        classes = @ConstructorResult(
                targetClass = LecturerResult.class,
                columns = {
                        @ColumnResult(name = "lecturerCode"),
                        @ColumnResult(name = "departmentId", type = Integer.class),
                        @ColumnResult(name = "title"),
                        @ColumnResult(name = "position"),
                        @ColumnResult(name = "description"),
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
@Table(name = "lecturer")
public class Lecturer {
    @Id
    @Column(name = "lecturer_code")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String lecturerCode;

    @Basic
    @Column(name = "department_id")
    private int departmentId;

    @Basic
    @Column(name = "title")
    private String title;

    @Basic
    @Column(name = "position")
    private String position;

    @Basic
    @Column(name = "description")
    private String description;
}
