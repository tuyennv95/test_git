package com.tudinh.kltn.service.impl;

import com.tudinh.kltn.entity.Notification;
import com.tudinh.kltn.repository.NotificationRepository;
import com.tudinh.kltn.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    NotificationRepository notificationRepository;

    @Override
    public List<Notification> getNotificationsList(HashMap<String, String> propertySearch) {
        return notificationRepository.getNotificationsList(propertySearch);
    }

    @Override
    public Notification getNotificationById(int id) {
        return notificationRepository.findById(id).get();
    }

    @Override
    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public boolean updateNotification(Notification notification) {
        Notification _notification = getNotificationById(notification.getId());

        if (_notification.getId() > 0) {
            notificationRepository.save(notification);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteNotification(int[] ids) {
        return notificationRepository.deleteNotification(ids);
    }
}

