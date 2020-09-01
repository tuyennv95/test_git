package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.DocumentReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentReviewRepository extends JpaRepository<DocumentReview, Integer>, DocumentReviewRepositoryCustom {
}
