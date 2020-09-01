package com.tudinh.kltn.service;

import com.tudinh.kltn.entity.Notification;

import java.util.HashMap;
import java.util.List;

public interface NotificationService {

    List<Notification> getNotificationsList(HashMap<String, String> propertySearch);

    Notification getNotificationById(int id);

    Notification createNotification(Notification subject);

    boolean updateNotification(Notification subject);

    boolean deleteNotification(int[] ids);
}