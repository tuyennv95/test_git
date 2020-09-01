package com.tudinh.kltn.service.impl;

import com.tudinh.kltn.entity.User;
import com.tudinh.kltn.entity.result.LecturerResult;
import com.tudinh.kltn.repository.LecturerRepository;
import com.tudinh.kltn.repository.UserRepository;
import com.tudinh.kltn.service.LecturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class LecturerServiceImpl implements LecturerService {

    @Autowired
    LecturerRepository lecturerRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public List<LecturerResult> getLecturersList(HashMap<String, String> propertySearch) {
        return lecturerRepository.getLecturersList(propertySearch);
    }

    @Override
    public int getCountLecturer(HashMap<String, String> propertySearch) {
        return lecturerRepository.getCountLecturer(propertySearch);
    }

    @Override
    public LecturerResult getLecturerByCode(String code) {
        return lecturerRepository.getLecturerByCode(code);
    }

    @Override
    public boolean createLecturer(LecturerResult lecturerResult) {
        User user = new User(lecturerResult.getLecturerCode(), lecturerResult.getPassword(),
                lecturerResult.getFirstName(), lecturerResult.getLastName(),
                lecturerResult.getGender(), lecturerResult.getBirthday(),
                lecturerResult.getAddress(), lecturerResult.getEmail(),
                lecturerResult.getPhoneNumber(), 2);

        boolean isUser = userRepository.createUser(user);
        boolean isLecturer = lecturerRepository.createLecturer(lecturerResult);

        return isUser && isLecturer;
    }

    @Override
    public boolean updateLecturer(LecturerResult lecturerResult) {
        User user = new User(lecturerResult.getLecturerCode(), lecturerResult.getPassword(),
                lecturerResult.getFirstName(), lecturerResult.getLastName(),
                lecturerResult.getGender(), lecturerResult.getBirthday(),
                lecturerResult.getAddress(), lecturerResult.getEmail(),
                lecturerResult.getPhoneNumber(), lecturerResult.getRole());

        boolean isUser = userRepository.updateUser(user);
        boolean isLecturer = lecturerRepository.updateLecturer(lecturerResult);

        return isUser && isLecturer;
    }

    @Override
    public boolean deleteLecturer(String[] codes) {
        boolean isUser = userRepository.deleteUser(codes);
        boolean isLecturer = lecturerRepository.deleteLecturer(codes);

        return isUser && isLecturer;
    }
}

