package com.tudinh.kltn.repository.impl;

import com.tudinh.kltn.entity.Notification;
import com.tudinh.kltn.repository.NotificationRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;

public class NotificationRepositoryImpl implements NotificationRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    Query query;
    String qr;

    @Override
    public List<Notification> getNotificationsList(HashMap<String, String> propertySearch) {
        qr = "SELECT id, type, status, username, link, content, date_created AS dateCreated" +
                " FROM notification" +
                " WHERE 1=1 ";

        if (propertySearch.get("link") != null) {
            qr += " AND link = '" + propertySearch.get("link") + "'";
        }
        if (propertySearch.get("username") != null) {
            qr += " AND username = '" + propertySearch.get("username") + "'";
        }

        qr += " order by date_created DESC";

        query = em.createNativeQuery(qr, "NotificationResultMapping");

        return query.getResultList();
    }

    @Override
    public boolean deleteNotification(int[] ids) {
        qr = "DELETE FROM notification WHERE ";

        String qr2 = "id IN (0";
        for (int i = 0; i < ids.length; i++) {
            qr2 += ", " + ids[i];
        }

        query = em.createNativeQuery(qr + qr2 + ")");

        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("deleteNotification Lỗi: " + e);
            return false;
        }

        return true;
    }
}
