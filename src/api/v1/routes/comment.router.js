import * as express from 'express';
import CommentController from '../controllers/comment.controller'


export default express
  .Router()
  .get('/post', CommentController.getAllComments)
  .post('/post/:id', CommentController.createComment)
  // .get('/post/:id/comments/:id', CommentController.getComment)
  .patch('/:id', CommentController.updateComment)
  .delete('/:id', CommentController.deleteComment)