import * as express from 'express';
import UserController from '../controllers/user.controller'

export default express
  .Router()
  .get('/users', UserController.getAllUsers)
  .post('/', UserController.createUser)
  .get('/:id', UserController.getUser)
  .patch('/:id', UserController.updateUser)
  .delete('/:id', UserController.deleteUser)
  