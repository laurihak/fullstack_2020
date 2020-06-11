const { ApolloServer } = require('apollo-server')
require('dotenv').config()
const mongoose = require('mongoose')

const { typeDefs } = require('./typeDefs/typeDefs')
const { resolvers } = require('./resolvers/resolvers')
const { context } = require('./context/contextUser')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subsciptions ready at ${subscriptionsUrl}`)
})