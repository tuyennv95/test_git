package com.tudinh.kltn.service.impl;

import com.tudinh.kltn.entity.result.UserResult;
import com.tudinh.kltn.repository.UserRepository;
import com.tudinh.kltn.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserResult getUserByUsername(String username) {
        return userRepository.getUserByUsername(username);
    }
}

