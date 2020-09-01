package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.User;
import com.tudinh.kltn.entity.result.UserResult;


public interface UserRepositoryCustom {

    UserResult getUserByUsername(String username);

    boolean createUser(User user);

    boolean updateUser(User user);

    boolean deleteUser(String[] usernames);
}
