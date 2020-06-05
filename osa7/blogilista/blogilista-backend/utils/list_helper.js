const _ = require('lodash')

const dummy = () => {
  return 1
}
const totalLikes = (blogs) => {
  let likes = 0
  blogs.forEach(blog => {
    likes = likes + blog.likes
  })
  return (likes)
}

const favoriteBlog = (blogs) => {
  let number = Math.max.apply(Math, blogs.map(blog => blog.likes))
  let blog = blogs.find(blog => blog.likes === number)
  return (blog)
}

const mostBlogs = (blogs) => {
  let authors = blogs.map(blog => blog.author)

  let result = _(authors)
    .countBy()
    .entries()
    .maxBy(_.last)

  return result
}

const mostLikes = (blogs) => {
  let authorsWithLikes = blogs.map(blog => {
    return ({
      author: blog.author,
      likes: blog.likes
    })
  })

  let result = _(authorsWithLikes)
    .groupBy('author')
    .map((objs, key) => {
      return {
        'author': key,
        'likes': _.sumBy(objs, 'likes')
      }
    })
    .value()

  let mostLikes = Math.max.apply(Math, result.map(person => person.likes))
  let authorWithMostLikes = result.find(person => person.likes === mostLikes)

  return (authorWithMostLikes)

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

