/// <reference types="cypress" />
describe('Blog ', function () {

  this.beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'laurih',
      name: 'lauri hakala',
      password: 'salainen'
    }
    const user2 = {
      username: 'root',
      name: 'root admin',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function () {
    cy.contains('Blogs')
  })
  describe('login', function () {
    it('user can login,', function () {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('laurih')
      cy.get('#password')
        .type('salainen')
      cy.get('#login-button')
        .click()

      cy.contains('lauri hakala logged in')
    })

    it('login fails with wrong password', function () {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('laurih')
      cy.get('#password')
        .type('wrong')
      cy.get('#login-button')
        .click()

      cy.get('#error')
        .should('contain', 'Wrong credentials')

      cy.get('html').should('not.contain', 'lauri hakala logged in')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'laurih', password: 'salainen' })
    })

    it('a new blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('creating a blog with cypress')
      cy.get('#author').type('fullstack2020')
      cy.get('#url').type('www.google.com/fullstack')
      cy.get('#create-button').click()
      cy.contains('creating a blog with cypress')
    })
    it('you can like a blog', function () {
      cy.createBlog({ title: 'cypress created this blog', author: 'cypress', url: 'www.google.com' })
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.contains('1')
      cy.get('#like-button').click()
      cy.contains('2')
    })
    it('blog poster can also delete blog', function () {
      cy.createBlog({ title: 'cypress created this blog', author: 'cypress', url: 'www.google.com' })
      cy.get('#view-button').click()
      cy.contains('cypress created this blog')
      cy.get('#delete-button').click()
      cy.get('html').should('contain', 'blog deleted succesfully')
    })
    it('person who did not add the blog cannot delete it', function () {
      cy.createBlog({ title: 'cypress created this blog', author: 'cypress', url: 'www.google.com' })
      cy.get('#logout-button').click()
      cy.login({ username: 'root', password: 'salainen' })
      cy.contains('admin logged in')
      cy.get('#view-button').click()
      cy.get('html').should('not.contain', 'delete')
    })
    it('blogs are sorted with likes', function () {
      cy.createBlog({ title: '4 likes', author: 'Minni', url: 'www.google.com', likes:4 })
      cy.createBlog({ title: '7 likes', author: 'Aku', url: 'www.google.com', likes:7 })
      cy.createBlog({ title: '8 likes', author: 'Mikki', url: 'www.google.com', likes:8 })
      cy.createBlog({ title: '12 likes', author: 'Hessu', url: 'www.google.com', likes:12 })
      cy.get('#view-button').click()

      cy.get('#bloglist').then(div => {
        cy.wrap(div.children()[0])
      }).should('contain', 'Hessu')

      cy.get('#view-button').click()
      cy.get('#bloglist').then(div => {
        cy.wrap(div.children()[1])
      }).should('contain', 'Mikki')

      cy.get('#view-button').click()
      cy.get('#bloglist').then(div => {
        cy.wrap(div.children()[2])
      }).should('not.contain', 'Mikki')
    })
  })
})
