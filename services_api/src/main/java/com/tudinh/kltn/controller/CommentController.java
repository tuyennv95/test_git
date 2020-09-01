package com.tudinh.kltn.controller;

import com.tudinh.kltn.entity.Comment;
import com.tudinh.kltn.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    CommentService CommentService;

    @GetMapping("/{id}")
    public Comment getComment(@PathVariable("id") int id) {
        return CommentService.getCommentById(id);
    }

    @GetMapping("/get-by-documetid/{id}")
    public Comment getCommentByDocumentId(@PathVariable("id") int documentId) {
        return CommentService.getCommentByDocumentId(documentId);
    }

    @PostMapping(value = "/create")
    public Comment createComment(@RequestBody Comment comment) {
        return CommentService.createComment(comment);
    }

    @PutMapping("/update")
    public boolean updateComment(@RequestBody Comment comment) {
        return CommentService.updateComment(comment);
    }

    @GetMapping("/delete/{id}")
    public boolean deleteComment(@PathVariable("id") int id) {
        return CommentService.deleteComment(id);
    }
}