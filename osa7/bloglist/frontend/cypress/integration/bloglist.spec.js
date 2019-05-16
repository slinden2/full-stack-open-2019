describe('Bloglist', function() {
  // beforeEach(function() {
    
  // })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
  })

  it('user can login', function() {
    cy.get('[data-cy=username]')
      .type('cypress')
    cy.get('[data-cy=password]')
      .type('salainen')
    cy.get('[data-cy=login]')
      .click()
    cy.contains('cypress logged in')
  })

})