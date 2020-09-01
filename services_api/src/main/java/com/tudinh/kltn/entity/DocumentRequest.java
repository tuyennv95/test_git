package com.tudinh.kltn.entity;

import com.tudinh.kltn.entity.result.DocumentRequestResult;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SqlResultSetMapping(
        name = "DocumentRequestResultMapping",
        classes = @ConstructorResult(
                targetClass = DocumentRequestResult.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "studentCode"),
                        @ColumnResult(name = "firstName"),
                        @ColumnResult(name = "lastName"),
                        @ColumnResult(name = "classCode"),
                        @ColumnResult(name = "title"),
                        @ColumnResult(name = "request"),
                        @ColumnResult(name = "comment"),
                        @ColumnResult(name = "status", type = Integer.class)
                }))
@Table(name = "document_request")
public class DocumentRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "student_code")
    private String studentCode;

    @Basic
    @Column(name = "title")
    private String title;

    @Basic
    @Column(name = "request")
    private String request;

    @Basic
    @Column(name = "comment")
    private String comment;

    @Basic
    @Column(name = "status")
    private int status;

    public DocumentRequest(DocumentRequestResult dr) {
        this.id = dr.getId();
        this.studentCode = dr.getStudentCode();
        this.title = dr.getTitle();
        this.request = dr.getRequest();
        this.comment = dr.getComment();
        this.status = dr.getStatus();
    }
}