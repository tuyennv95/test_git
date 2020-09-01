package com.tudinh.kltn.controller;

import com.tudinh.kltn.entity.Notification;
import com.tudinh.kltn.entity.result.SearchResult;
import com.tudinh.kltn.entity.result.SubjectResult;
import com.tudinh.kltn.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/notification")
public class NotificationController {

    @Autowired
    NotificationService notificationService;

    @PostMapping("")
    public ResponseEntity<List<Notification>> getNotificationsList(@RequestBody HashMap<String, String> propertySearch) {
        System.out.println(propertySearch);

        List<Notification> list = notificationService.getNotificationsList(propertySearch);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Notification getNotification(@PathVariable("id") int id) {
        return notificationService.getNotificationById(id);
    }

    @PostMapping(value = "/create")
    public String createNotification(@RequestBody Notification[] comments) {
        for (Notification n : comments) {
            notificationService.createNotification(n);
        }

        return "1";
    }

    @PutMapping("/update")
    public boolean updateNotification(@RequestBody Notification[] comments) {
        for (Notification n : comments) {
            return notificationService.updateNotification(n);
        }

        return true;
    }

    @PostMapping("/delete")
    public boolean deleteNotification(@RequestBody int[] ids) {
        return notificationService.deleteNotification(ids);
    }
}