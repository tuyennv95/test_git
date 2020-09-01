package com.tudinh.kltn.entity;

import com.tudinh.kltn.entity.result.UserResult;
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
        name = "UserResultMapping",
        classes = @ConstructorResult(
                targetClass = UserResult.class,
                columns = {
                        @ColumnResult(name = "username"),
                        @ColumnResult(name = "password"),
                        @ColumnResult(name = "role", type = Integer.class),
                }))
@Table(name = "user")
public class User {
    @Id
    @Column(name = "username")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String username;

    @Basic
    @Column(name = "password")
    private String password;

    @Basic
    @Column(name = "first_name")
    private String firstName;

    @Basic
    @Column(name = "last_name")
    private String lastName;

    @Basic
    @Column(name = "gender")
    private int gender;

    @Basic
    @Column(name = "birthday")
    private Date birthday;

    @Basic
    @Column(name = "address")
    private String address;

    @Basic
    @Column(name = "email")
    private String email;

    @Basic
    @Column(name = "phone_number")
    private String phoneNumber;

    @Basic
    @Column(name = "role")
    private int role;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
