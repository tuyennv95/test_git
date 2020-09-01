package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.FileManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileManagerRepository extends JpaRepository<FileManager, Integer>, FileManagerRepositoryCustom {
}
