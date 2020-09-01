package com.tudinh.kltn.service.impl;

import com.tudinh.kltn.entity.Comment;
import com.tudinh.kltn.repository.CommentRepository;
import com.tudinh.kltn.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(rollbackFor = Exception.class)
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Override
    public Comment getCommentById(int id) {
        try {
            return commentRepository.findById(id).get();
        } catch (Exception e) {
            return new Comment();
        }
    }

    @Override
    public Comment getCommentByDocumentId(int documentId) {
        return commentRepository.getCommentByDocumentId(documentId);
    }

    @Override
    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public boolean updateComment(Comment comment) {
        Comment _comment = getCommentById(comment.getId());

        if (_comment.getId() > 0) {
            commentRepository.save(comment);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteComment(int id) {
        try {
            Comment _comment = getCommentById(id);
            commentRepository.delete(_comment);
        } catch (Exception e) {
            System.out.println("Lỗi deleteComment: " + e);
            return false;
        }

        return true;
    }
}

