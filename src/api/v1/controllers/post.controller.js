import { err } from "pino-std-serializers"
import Post from "../models/post.model"

export class PostController {
  getAllPosts(request, response) {
    response.json({ message: 'Get All Users OK' })
  }

  getPost(request, response) {
    response.json({ message: 'Get User OK' })
  }

  createPost = async (request, response, next) => {
    // response.json({ message: 'Create User OK' })
    try {
      const {title, content, author} = request.body
      const newPost = new Post({
        title,
        content,
        author
      })

      await newPost.save()
      response.status(201).send(newPost);
    } catch (error) {
      next(error)
    }
      
  }

  updatePost(request, response) {
    response.json({ message: 'Update User OK' })
  }

  deletePost(request, response) {
    response.json({ message: 'Delete User OK' })
  }
}

export default new PostController()