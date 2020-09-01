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
        name = "RangeResultMapping",
        classes = @ConstructorResult(
                targetClass = Range.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "rangeName"),
                        @ColumnResult(name = "departmentId"),
                        @ColumnResult(name = "description"),
                }))
@Table(name = "rangee")
public class Range {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "range_name")
    private String rangeName;

    @Basic
    @Column(name = "department_id")
    private int departmentId;

    @Basic
    @Column(name = "description")
    private String description;

    public Range(String rangeName, int departmentId, String description) {
        this.rangeName = rangeName;
        this.departmentId = departmentId;
        this.description = description;
    }
}
