const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now()
  },
  favs: {
    type: Array
  }
})

module.exports = mongoose.model('User', UsersSchema)
