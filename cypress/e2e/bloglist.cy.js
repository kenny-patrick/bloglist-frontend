describe('Blog app', function () {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Kenny',
      username: 'kenny',
      password: 'superStrongPassword'
    }
    const unauthorizedUser = {
      name: 'John Redcorn',
      username: 'jredcorn',
      password: 'superStrongPassword'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, unauthorizedUser)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  it('Login succeeds with correct credentials', function() {
    cy.get('#username').type('kenny')
    cy.get('#password').type('superStrongPassword')
    cy.get('#login-button').click()

    cy.contains('Kenny has logged in')
  })

  it('Login fails with wrong credentials', function() {
    cy.get('#username').type('kenny')
    cy.get('#password').type('wrongPassword')
    cy.get('#login-button').click()

    cy.contains('Kenny has logged in').should('not.exist')
  })

  describe('when logged in', function() {
    beforeEach(function () {
      cy.login({ username: 'kenny', password: 'superStrongPassword' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#create-button').click()

      cy.contains('title author')
    })

    describe('when blog list is populated', function() {
      beforeEach(function () {
        cy.createBlog({
          title: 'title',
          author: 'author',
          url: 'url'
        })
      })

      it('User can like existing blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()

        cy.contains('likes 1')
      })

      it('Blog can be deleted by the User that created it', function() {
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.contains('title author').should('not.exist')
      })

      it('Blog cannot be deleted by User who did not create it', function() {
        cy.contains('log out').click()

        cy.login({ username: 'jredcorn', password: 'superStrongPassword' })

        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
      })
    })

    describe('when blog list is populated with multiple blogs', function() {
      beforeEach(function() {
        [
          {
            title: 'blog 1',
            author: 'author 1',
            url: 'url 1'
          },
          {
            title: 'blog 2',
            author: 'author 2',
            url: 'url 2'
          },
          {
            title: 'blog 3',
            author: 'author 3',
            url: 'url 3'
          }
        ].forEach(blog => {
          cy.createBlog(blog)
        })
      })

      it('Blogs are sorted by number of likes in descending order', function() {
        cy.get('.blogHeader').eq(2).contains('view').click()
        cy.get('.blogDetails').eq(2).contains('like').click()

        cy.get('.blogDetails').eq(0).contains('blog 3 author 3')
      })
    })
  })
})