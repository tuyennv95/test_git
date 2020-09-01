package com.tudinh.kltn.entity;

import com.tudinh.kltn.entity.result.SubjectResult;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SqlResultSetMapping(
        name = "SubjectResultMapping",
        classes = @ConstructorResult(
                targetClass = SubjectResult.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "subjectCode"),
                        @ColumnResult(name = "subjectName"),
                        @ColumnResult(name = "departmentId", type = Integer.class),
                        @ColumnResult(name = "departmentName"),
                        @ColumnResult(name = "rangeIds"),
                        @ColumnResult(name = "type", type = Integer.class),
                        @ColumnResult(name = "description"),
                }))
@Table(name = "subject")
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "subject_code")
    private String subjectCode;

    @Basic
    @Column(name = "subject_name")
    private String subjectName;

    @Basic
    @Column(name = "department_id")
    private int departmentId;

    @Basic
    @Column(name = "range_ids")
    private String rangeIds;

    @Basic
    @Column(name = "type")
    private int type;

    @Basic
    @Column(name = "description")
    private String description;

    public Subject(SubjectResult sr) {
        this.id = sr.getId();
        this.subjectCode = sr.getSubjectCode();
        this.subjectName = sr.getSubjectName();
        this.departmentId = sr.getDepartmentId();
        this.rangeIds = sr.getRangeIds();
        this.type = sr.getType();
        this.description = sr.getDescription();
    }
}
