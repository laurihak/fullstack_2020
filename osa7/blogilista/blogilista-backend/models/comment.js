const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const commentSchema = mongoose.Schema({
  content: { type: String, required: true },
  user:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
}
)

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment