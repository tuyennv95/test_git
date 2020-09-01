package com.tudinh.kltn.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SqlResultSetMapping(
        name = "FileManagerResultMapping",
        classes = @ConstructorResult(
                targetClass = FileManager.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "documentId"),
                        @ColumnResult(name = "file")
                }))
@Table(name = "file_manager")
public class FileManager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "document_id")
    private int documentId;

    @Basic
    @Column(name = "file")
    private String file;

    public FileManager(int documentId, String file) {
        this.documentId = documentId;
        this.file = file;
    }
}
