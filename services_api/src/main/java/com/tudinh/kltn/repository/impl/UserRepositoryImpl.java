package com.tudinh.kltn.repository.impl;

import com.tudinh.kltn.entity.User;
import com.tudinh.kltn.entity.result.UserResult;
import com.tudinh.kltn.repository.UserRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

public class UserRepositoryImpl implements UserRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    Query query;
    String qr;

    @Override
    public UserResult getUserByUsername(String username) {
        qr = "SELECT u.username as username, u.password as password, u.role as role" +
                " FROM user AS u" +
                " WHERE username = ?0";

        query = em.createNativeQuery(qr, "UserResultMapping");

        query.setParameter(0, username);

        try {
            query.getSingleResult();
        } catch (Exception e) {
            System.out.println("getUserByUsername Lỗi: " + e);
            return null;
        }

        return (UserResult) query.getSingleResult();
    }

    @Override
    public boolean createUser(User user) {
        qr = "INSERT INTO user (`username`, `address`, `email`, `first_name`, `gender`, " +
                "`last_name`, `password`, `phone_number`, `role`, `birthday`) " +
                "VALUES (?0, ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9);";

        query = em.createNativeQuery(qr);

        query.setParameter(0, user.getUsername());
        query.setParameter(1, user.getAddress());
        query.setParameter(2, user.getEmail());
        query.setParameter(3, user.getFirstName());
        query.setParameter(4, user.getGender());
        query.setParameter(5, user.getLastName());
        query.setParameter(6, user.getPassword());
        query.setParameter(7, user.getPhoneNumber());
        query.setParameter(8, user.getRole());
        query.setParameter(9, user.getBirthday());

        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("createUser Lỗi: " + e);
            return false;
        }

        return true;
    }

    @Override
    public boolean updateUser(User user) {
        qr = "UPDATE user SET `address` = ?0, `email` = ?1, `first_name` = ?2, " +
                "`gender` = ?3,   `last_name` = ?4, `password` = ?5, `phone_number` = ?6, " +
                "`role` = ?7, `birthday` = ?8 " +
                "WHERE (`username` = ?9);";

        query = em.createNativeQuery(qr);


        query.setParameter(0, user.getAddress());
        query.setParameter(1, user.getEmail());
        query.setParameter(2, user.getFirstName());
        query.setParameter(3, user.getGender());
        query.setParameter(4, user.getLastName());
        query.setParameter(5, user.getPassword());
        query.setParameter(6, user.getPhoneNumber());
        query.setParameter(7, user.getRole());
        query.setParameter(8, user.getBirthday());
        query.setParameter(9, user.getUsername());

        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("updateUser Lỗi: " + e);
            return false;
        }

        return true;
    }

    @Override
    public boolean deleteUser(String[] usernames) {
        qr = "DELETE FROM user WHERE ";

        String qr2 = "username IN (''";
        for (int i = 0; i < usernames.length; i++) {
            qr2 += ", '" + usernames[i] + "'";
        }

        query = em.createNativeQuery(qr + qr2 + ")");

        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("deleteUser Lỗi: " + e);
            return false;
        }

        return true;
    }
}
