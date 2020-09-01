package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.LecturerSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LecturerSubjectRepository extends JpaRepository<LecturerSubject, Integer>, LecturerSubjectRepositoryCustom {
}
