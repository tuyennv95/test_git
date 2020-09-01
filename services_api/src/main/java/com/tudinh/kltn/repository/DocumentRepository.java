package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Integer>, DocumentRepositoryCustom {
}
