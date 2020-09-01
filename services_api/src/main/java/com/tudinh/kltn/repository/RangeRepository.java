package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.Range;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RangeRepository extends JpaRepository<Range, Integer>, RangeRepositoryCustom {
}
