package com.tudinh.kltn.service.impl;

import com.tudinh.kltn.entity.User;
import com.tudinh.kltn.entity.result.StudentResult;
import com.tudinh.kltn.repository.StudentRepository;
import com.tudinh.kltn.repository.UserRepository;
import com.tudinh.kltn.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class StudentServiceImpl implements StudentService {

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public List<StudentResult> getStudentsList(HashMap<String, String> propertySearch) {
        return studentRepository.getStudentsList(propertySearch);
    }

    @Override
    public int getCountStudent(HashMap<String, String> propertySearch) {
        return studentRepository.getCountStudent(propertySearch);
    }

    @Override
    public StudentResult getStudentByCode(String code) {
        return studentRepository.getStudentByCode(code);
    }

    @Override
    public boolean createStudent(StudentResult studentResult) {
        User user = new User(studentResult.getStudentCode(), studentResult.getPassword(),
                studentResult.getFirstName(), studentResult.getLastName(),
                studentResult.getGender(), studentResult.getBirthday(),
                studentResult.getAddress(), studentResult.getEmail(),
                studentResult.getPhoneNumber(), studentResult.getRole());

        boolean isUser = userRepository.createUser(user);
        boolean isStudent = studentRepository.createStudent(studentResult);

        return isUser && isStudent;
    }

    @Override
    public boolean updateStudent(StudentResult studentResult) {
        User user = new User(studentResult.getStudentCode(), studentResult.getPassword(),
                studentResult.getFirstName(), studentResult.getLastName(),
                studentResult.getGender(), studentResult.getBirthday(),
                studentResult.getAddress(), studentResult.getEmail(),
                studentResult.getPhoneNumber(), studentResult.getRole());

        boolean isUser = userRepository.updateUser(user);
        boolean isStudent = studentRepository.updateStudent(studentResult);

        return isUser && isStudent;
    }

    @Override
    public boolean deleteStudent(String[] codes) {
        boolean isUser = userRepository.deleteUser(codes);
        boolean isStudent = studentRepository.deleteStudent(codes);

        return isUser && isStudent;
    }
}

