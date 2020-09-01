package com.tudinh.kltn.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SqlResultSetMapping(
        name = "DepartmentResultMapping",
        classes = @ConstructorResult(
                targetClass = Department.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "departmentCode"),
                        @ColumnResult(name = "departmentName"),
                        @ColumnResult(name = "description"),
                }))
@Table(name = "department")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "department_code")
    private String departmentCode;

    @Basic
    @Column(name = "department_name")
    private String departmentName;

    @Basic
    @Column(name = "description")
    private String description;
}
