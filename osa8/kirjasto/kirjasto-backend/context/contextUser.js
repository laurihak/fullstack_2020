const User = require('../models/user')
const jwt = require('jsonwebtoken')


const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const context = async ({ req }) => {
  const authorization = req ? req.headers.authorization : null
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET)
    const currentUser = await User.findById(decodedToken.id)
    return { currentUser }
  }
}

module.exports = { context }