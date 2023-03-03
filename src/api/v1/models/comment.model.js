import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  likes: {
    type: Number
  },
  replies: {
    type: Number
  }
}, { 
  timestamps: true 
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment