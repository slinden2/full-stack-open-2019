

describe('Bloglist', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'cypress',
      username: 'cypress',
      password: 'salainen'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')

    cy.contains('Log in to application')

    cy.get('[data-cy=username]')
      .type('cypress')
    cy.get('[data-cy=password]')
      .type('salainen')
    cy.get('[data-cy=login]')
      .click()
  })


  describe('when logged in', function() {
    it('name of the user is shown', function() {
      cy.contains('cypress logged in')
    })

    it('a new blog can be added', function() {
      cy.get('[data-cy=addblog]')
        .click()
      cy.get('[data-cy=title]')
        .type('cypress test blog')
      cy.get('[data-cy=author]')
        .type('cypress')
      cy.get('[data-cy=url]')
        .type('www')
      cy.get('[data-cy=create]')
        .click()
      cy.contains('cypress test blog')
    })

    it('a like can be added', function() {
      cy.get('[data-cy=addblog]')
        .click()
      cy.get('[data-cy=title]')
        .type('cypress test blog')
      cy.get('[data-cy=author]')
        .type('cypress')
      cy.get('[data-cy=url]')
        .type('www')
      cy.get('[data-cy=create]')
        .click()
      cy.get('div.item > div > div > a')
        .click()
      cy.get('[data-cy=like]')
        .click()
      cy.contains('label', '1')
      cy.contains('You liked cypress test blog')
    })

  })
})