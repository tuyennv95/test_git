package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.Comment;
import com.tudinh.kltn.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer>, NotificationRepositoryCustom {
}
