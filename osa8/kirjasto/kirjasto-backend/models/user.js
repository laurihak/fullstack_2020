const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  favoritegenres: [
    {
      type: String,
      unique: true,
    }],
})

module.exports = mongoose.model('User', schema)
