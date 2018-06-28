import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = new Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  image: {
    type: String,
    required: false,
    default:
      'https://cdn.xl.thumbs.canstockphoto.com/question-mark-eps-vector_csp14347140.jpg'
  },
  group: { type: String, required: false, default: 'General' }
})

mongoose.model('Card', schema)
