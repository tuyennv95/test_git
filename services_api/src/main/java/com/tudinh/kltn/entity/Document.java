package com.tudinh.kltn.entity;

import com.tudinh.kltn.entity.result.DocumentResult;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SqlResultSetMapping(
        name = "DocumentResultMapping",
        classes = @ConstructorResult(
                targetClass = DocumentResult.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "documentName"),
                        @ColumnResult(name = "topicType"),
                        @ColumnResult(name = "documentType"),
                        @ColumnResult(name = "keyword"),
                        @ColumnResult(name = "status"),
                        @ColumnResult(name = "lecturerCode"),
                        @ColumnResult(name = "title"),
                        @ColumnResult(name = "firstName"),
                        @ColumnResult(name = "lastName"),
                        @ColumnResult(name = "departmentId", type = Integer.class),
                        @ColumnResult(name = "departmentName"),
                        @ColumnResult(name = "subjectId", type = Integer.class),
                        @ColumnResult(name = "subjectName"),
                        @ColumnResult(name = "description"),
                        @ColumnResult(name = "viewsCount"),
                        @ColumnResult(name = "downloadsCount"),
                        @ColumnResult(name = "isCopyrightWarning"),
                        @ColumnResult(name = "userCreated"),
                        @ColumnResult(name = "dateCreated"),
                        @ColumnResult(name = "userUpdated"),
                        @ColumnResult(name = "dateUpdated"),
                }))
@Table(name = "document")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "document_name")
    private String documentName;

    // 1 - tài liệu bình thường, 2 - đề tài ttcn-kltn
    @Basic
    @Column(name = "topic_type")
    private int topicType;

    @Basic
    @Column(name = "document_type")
    private int documentType;

    @Basic
    @Column(name = "keyword", columnDefinition = "TEXT")
    private String keyword;

    @Basic
    @Column(name = "status")
    private int status;

    @Basic
    @Column(name = "lecturer_code")
    private String lecturerCode;

    @Basic
    @Column(name = "department_id")
    private int departmentId;

    @Basic
    @Column(name = "subject_id")
    private int subjectId;

    @Basic
    @Column(name = "description")
    private String description;

    @Basic
    @Column(name = "views_count")
    private int viewsCount;

    @Basic
    @Column(name = "downloads_count")
    private int downloadsCount;

    @Basic
    @Column(name = "is_copyright_warning")
    private boolean isCopyrightWarning;

    @Basic
    @Column(name = "user_created")
    private String userCreated;

    @Basic
    @Column(name = "date_created")
    private Date dateCreated;

    @Basic
    @Column(name = "user_updated")
    private String userUpdated;

    @Basic
    @Column(name = "date_updated")
    private Date dateUpdated;

    public Document(DocumentResult dr) {
        this.id = dr.getId();
        this.documentName = dr.getDocumentName();
        this.keyword = dr.getKeyword();
        this.topicType = dr.getTopicType();
        this.documentType = dr.getDocumentType();
        this.status = dr.getStatus();
        this.lecturerCode = dr.getLecturerCode();
        this.departmentId = dr.getDepartmentId();
        this.subjectId = dr.getSubjectId();
        this.description = dr.getDescription();
        this.viewsCount = dr.getViewsCount();
        this.downloadsCount = dr.getDownloadsCount();
        this.isCopyrightWarning = dr.isCopyrightWarning();
        this.userCreated = dr.getUserCreated();
        this.dateCreated = dr.getDateCreated();
        this.userUpdated = dr.getUserUpdated();
        this.dateUpdated = dr.getDateUpdated();
    }
}
