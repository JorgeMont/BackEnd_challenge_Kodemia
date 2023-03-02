import * as express from 'express';
import UserController from '../controllers/user.controller'
// import router from './post.router';

const router = express.Router('/api/v1/users')

.get('/', UserController.getAllUsers)
.post('/', UserController.createUser)
.get('/:id', UserController.getUser)
.patch('/:id', UserController.updateUser)
.delete('/:id', UserController.deleteUser)

export default router