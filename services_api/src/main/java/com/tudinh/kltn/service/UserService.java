package com.tudinh.kltn.service;

import com.tudinh.kltn.entity.result.UserResult;


public interface UserService {

    UserResult getUserByUsername(String username);
}