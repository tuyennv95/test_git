package com.tudinh.kltn.service;

import com.tudinh.kltn.entity.Comment;

public interface CommentService {

    Comment getCommentById(int id);

    Comment getCommentByDocumentId(int documentId);

    Comment createComment(Comment comment);

    boolean updateComment(Comment comment);

    boolean deleteComment(int id);
}