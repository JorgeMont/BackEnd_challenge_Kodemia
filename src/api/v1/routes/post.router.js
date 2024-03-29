import * as express from 'express';

import PostController from '../controllers/post.controller'

const router = express.Router('/api/v1/posts')

.get('/', PostController.getAllPosts)
  .post('/', PostController.createPost)
  .get('/:id', PostController.getPost)
  .patch('/:id', PostController.updatePost)
  .delete('/:id', PostController.deletePost)
  
  export default router