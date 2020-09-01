package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.Lecturer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LecturerRepository extends JpaRepository<Lecturer, Integer>, LecturerRepositoryCustom {
}
