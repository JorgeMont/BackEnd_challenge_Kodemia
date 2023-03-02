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

  updatePost = async (request, response) => {
    try {
      const { id } = request.params
      const bodyParams = { ...request.body }
  
      const updatedPost= await Post.findByIdAndUpdate(id, bodyParams, 
          { new: true })
  
      response.status(201).send(updatedPost)
    } catch(error) {
      console.log(error)
    }
  }

  deletePost = async (request, response) => {

    const { id } = request.params
    const deletedPost = await Post.findByIdAndDelete(id)
    
    if (!deletedPost) {
      response.status(404).send({ 
        error: 'No se encontro ningún registro en la base de datos'
      })
    }

    response.status(200).send({ message: 'Registro eliminado correctamente'})
  }
}

export default new PostController()