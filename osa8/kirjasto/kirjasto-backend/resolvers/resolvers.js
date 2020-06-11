const { UserInputError, AuthenticationError, PubSub } = require('apollo-server')

const Author = require('../models/author')
const Book = require('../models/book')
const User = require('../models/user')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: (root) => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
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
      return root.books.length
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
        foundAuthor = new Author({ name: args.author, books: [] })
        try {
          await foundAuthor.save()
        } catch (e) {
          throw new UserInputError(e.message, {
            invalidArgs: args
          })
        }
      }
      const book = new Book({ ...args })
      foundAuthor.books = foundAuthor.books.concat(book)
      book.author = await Author.findOne({ name: args.author })
      try {
        await foundAuthor.save()
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

module.exports = { resolvers }