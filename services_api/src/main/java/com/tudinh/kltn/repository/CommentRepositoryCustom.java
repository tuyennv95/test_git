package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.Comment;

public interface CommentRepositoryCustom {

    Comment getCommentByDocumentId(int id);

}
