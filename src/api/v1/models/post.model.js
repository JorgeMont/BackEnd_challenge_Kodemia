import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  author: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  tags: {
    type: Array,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
},
{ 
    timestamps: true 
  }
)

const Post = mongoose.model('Post', postSchema)

export default Post
