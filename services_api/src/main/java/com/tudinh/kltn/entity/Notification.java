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
        name = "NotificationResultMapping",
        classes = @ConstructorResult(
                targetClass = Notification.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "type"),
                        @ColumnResult(name = "status"),
                        @ColumnResult(name = "username"),
                        @ColumnResult(name = "link"),
                        @ColumnResult(name = "content"),
                        @ColumnResult(name = "dateCreated"),
                }))
@Table(name = "notification")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    // xác định đây là thông báo từ đâu
    @Basic
    @Column(name = "type")
    private int type;

    // xác định thông báo đã được đọc chưa
    @Basic
    @Column(name = "status")
    private int status;

    // người nhận thông báo
    @Basic
    @Column(name = "username")
    private String username;

    @Basic
    @Column(name = "link")
    private String link;

    @Basic
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Basic
    @Column(name = "date_created")
    private String dateCreated;
}
