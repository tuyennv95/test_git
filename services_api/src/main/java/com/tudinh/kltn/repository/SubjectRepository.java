package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer>, SubjectRepositoryCustom {
}
