package com.tudinh.kltn.entity;

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
        name = "CommentResultMapping",
        classes = @ConstructorResult(
                targetClass = Comment.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "documentId"),
                        @ColumnResult(name = "content"),
                        @ColumnResult(name = "dateUpdated"),
                }))
@Table(name = "comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "document_id")
    private int documentId;

    @Basic
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Basic
    @Column(name = "date_updated")
    private Date dateUpdated;
}
