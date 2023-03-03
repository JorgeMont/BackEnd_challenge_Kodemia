import Comment from "../models/comment.model"
import Post from "../models/post.model"

export class CommentController {

  getAllComments = async(request, response) => {
    try {
      const { id } = request.params
      const post = await Post.findById(id)
      const comments = await Comment.find({}); //Con los {} dice que traiga todo
      if (!post) {
        response.status(404).send({ error: 'no existe ningun registro en la base de datos con este ID'})
      
        response.status(200).send(comments);
    } 
  }catch (error) {
    console.log(error)
  }}

  // getComment = async(request, response, next) => {
  //   try {
      
  //     const { id } = request.params
  //     const comment = await Comment.findById(id)

  //     if(!comment){
  //       response.status(404).send({ 
  //         error: 'No se encontro ningún registro en la base de datos'
  //       })
  //     }
  //     response.status(200).send(comment)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  createComment = async (request, response) => {
    try {
      const { id } = request.params
      const post = await Post.findById(id)
      
      if (!post) {
        response.status(404).send({ error: 'no existe ningun registro en la base de datos con este ID'})
      } 
  
      const { content, author, likes, replies } = request.body
  
      const newComment = new Comment({
        content,
        author,
        likes,
        replies
      })
  
      const comment = await newComment.save()
  
      post.comments.push(comment)
  
      await post.save()
  
      response.status(201).send(comment)
    } catch (error) {
      next(error)
    }
  }

  updateComment = async (request, response) => {
    try {
      const { id } = request.params
      const bodyParams = { ...request.body }
  
      const updatedComment= await Comment.findByIdAndUpdate(id, bodyParams, 
          { new: true })
  
      response.status(201).send(updatedComment)
    } catch(error) {
      console.log(error)
    }
  }

  deleteComment = async (request, response) => {

    const { id } = request.params
    const deletedComment = await Comment.findByIdAndDelete(id)
    
    if (!deletedComment) {
      response.status(404).send({ 
        error: 'No se encontro ningún registro en la base de datos'
      })
    }

    response.status(200).send({ message: 'Registro eliminado correctamente'})
  }
}

export default new CommentController()