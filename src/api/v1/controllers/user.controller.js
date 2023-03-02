// import UserService from '../../'

import User from "../models/post.model"

export class UserController {

  getAllUsers = async(request, response) => {
    try {
      const users = await User.find({});
        response.status(200).send(users);
    } catch (error) {
      console.log(error)
    }
  }

  getUser = async(request, response, next) => {
    try {
      const { id } = request.params
      const user = await User.findById(id)

      if(!user){
        response.status(404).send({ 
          error: 'No se encontro ningún registro en la base de datos'
        })
      }
      response.status(200).send(user)
    } catch (error) {
      next(error)
    }
  }

  createUser = async (request, response, next) => {
    try {
      const {name, email, password, posts, comments} = request.body
      const newUser = new User({
        name,
        email,
        password,
        posts,
        comments
      })

      await newUser.save()
      response.status(201).send(newUser);
    } catch (error) {
      next(error)
    }
      
  }

  updateUser = async (request, response) => {
    try {
      const { id } = request.params
      const bodyParams = { ...request.body }
  
      const updatedUser = await Post.findByIdAndUpdate(id, bodyParams, 
          { new: true })
  
      response.status(201).send(updatedUser)
    } catch(error) {
      console.log(error)
    }
  }

  deleteUser = async (request, response) => {

    const { id } = request.params
    const deletedUser = await User.findByIdAndDelete(id)
    
    if (!deletedUser) {
      response.status(404).send({ 
        error: 'No se encontro ningún registro en la base de datos'
      })
    }

    response.status(200).send({ message: 'Registro eliminado correctamente'})
  }
}

export default new UserController()