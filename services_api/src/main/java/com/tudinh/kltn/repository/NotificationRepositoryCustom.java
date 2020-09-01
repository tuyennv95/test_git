package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.Notification;

import java.util.HashMap;
import java.util.List;

public interface NotificationRepositoryCustom {
    List<Notification> getNotificationsList(HashMap<String, String> propertySearch);

    boolean deleteNotification(int[] ids);
}
