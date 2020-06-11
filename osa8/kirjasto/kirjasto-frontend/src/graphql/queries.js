import { gql } from '@apollo/client'

const AUTHOR_DETAILS = gql`
fragment AuthorDetails on Author {
      name
      born
      bookCount
}
`

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
      title
      author{ 
        name
      }
      published
      genres
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
      ...AuthorDetails
  }
}
${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
${BOOK_DETAILS}
  `


export const BOOKS_BYGENRE = gql`
  query ($genre: String!) {
    allBooks (genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const GET_ME = gql`
query {
  me  {
    username
    favoritegenres
  }
}
`

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`
