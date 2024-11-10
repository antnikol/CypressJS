/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    // cy.visit('https://example.cypress.io/todo')
  })

  it.only('displays two todo items by default', () => {
    cy.visit('https://example.cypress.io/todo')
    cy.get('.dropdown-toggle').should('have.text', 'Commands ').click()
    cy.get('a[href="/commands/location"]').should('have.text', 'Location').click()
    cy.get('h1').should('have.text', 'Location')
    cy.get('.banner').should('have.css', 'background-color', 'rgb(0, 191, 136)')
    cy.get('#hash > a[href="https://on.cypress.io/hash"]').should('have.text', 'cy.hash()').click()
    cy.get('h1').should('have.text', 'hash')
  })
})
