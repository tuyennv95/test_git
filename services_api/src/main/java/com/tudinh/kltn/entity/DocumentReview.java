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
        name = "DocumentReviewMapping",
        classes = @ConstructorResult(
                targetClass = DocumentReview.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "studentCode"),
                        @ColumnResult(name = "documentId"),
                        @ColumnResult(name = "starVote"),
                        @ColumnResult(name = "isLike"),
                        @ColumnResult(name = "isFavourite")
                }))
@Table(name = "document_review")
public class DocumentReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "student_code")
    private String studentCode;

    @Basic
    @Column(name = "document_id")
    private int documentId;

    @Basic
    @Column(name = "star_vote")
    private float starVote;

    @Basic
    @Column(name = "is_like")
    private boolean isLike;

    @Basic
    @Column(name = "is_favourite")
    private boolean isFavourite;
}
