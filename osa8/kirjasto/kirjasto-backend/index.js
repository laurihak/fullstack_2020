const { ApolloServer, UserInputError, AuthenticationError, gql, PubSub } = require('apollo-server')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
let books = require('./resources/books')
let authors = require('./resources/authors')

const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)
const MONGODB_URI = process.env.MONGODB_URI

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
mongoose.set('useCreateIndex', true)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/


const typeDefs = gql`
  type Query {
    author(name: String!): Author
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  },
  type Book {
    title: String!
    author: Author!
    published: Int!
    id: ID!
    genres: [String!]!
  },
  type Author {
      name: String!
      id: String!
      born: Int
      bookCount: Int
  },
  type Token {
    value: String!
  },
  type User {
    username: String!
    favoritegenres: [String!]!
    id: ID!
  },
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoritegenres: [String!]!
    ): User
    login(
      username: String!
      password: String!
    ): Token 
  },
  type Subscription {
    bookAdded: Book!
  }
`  

const resolvers = {
  Query: {
    bookCount: (root) => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      console.log(args)
      const filters = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        filters.author = author.id
      }
      if (args.genre) {
        filters.genres = { $in: [args.genre] }
      }
      return Book.find({ ...filters }).populate('author')

    },
    allAuthors: () => Author.find({}),
    author(root, args) {
      return Author.findOne({ name: args.name })
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root })
      return books.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let foundAuthor = await Author.findOne({ name: args.author })
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      if (!foundAuthor) {
        author = new Author({ name: args.author })
        console.log('should be saving new author')
        try {
          await author.save()
        } catch (e) {
          throw new UserInputError(e.message, {
            invalidArgs: args
          })
        }
      }
      const book = new Book({ ...args })
      book.author = await Author.findOne({ name: args.author })
      try {
        await book.save()
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        await author.save()
      } catch {
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }
      return author
    },
    createUser: (root, args) => {
      console.log(args)
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const context = async ({ req }) => {
  const authorization = req ? req.headers.authorization : null
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET)
    const currentUser = await User.findById(decodedToken.id)
    return { currentUser }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subsciptions ready at ${subscriptionsUrl}`)
})