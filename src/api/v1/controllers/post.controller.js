// import { err } from "pino-std-serializers"
import Post from "../models/post.model"

export class PostController {

  getAllPosts = async(request, response) => {
    try {
      const posts = await Post.find({}); //Con los {} dice que traiga todo
        response.status(200).send(posts);
    } catch (error) {
      console.log(error)
    }
  }

  getPost = async(request, response, next) => {
    try {
      const { id } = request.params
      const post = await Post.findById(id)

      if(!post){
        response.status(404).send({ 
          error: 'No se encontro ningún registro en la base de datos'
        })
      }
      response.status(200).send(post)
    } catch (error) {
      next(error)
    }
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