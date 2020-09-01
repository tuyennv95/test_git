package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.DocumentRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRequestRepository extends JpaRepository<DocumentRequest, Integer>, DocumentRequestRepositoryCustom {
}
