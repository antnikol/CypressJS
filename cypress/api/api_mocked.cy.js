/// <reference types="cypress" />
import { liveServerUrl, message, baseUrl, gitHubActionsServerUrl } from '../fixtures/api.json'

describe('API tests with mocked data', () => {
  beforeEach(() => {
    Cypress.config('baseUrl', gitHubActionsServerUrl)
  })

  it('API 1(3): __Mocked_DATA__ Get All Products List', () => {
    cy.intercept('GET', '/api/productsList', {
      statusCode: 201,
      body: {
        products: [{ name: message.mocked }],
      },
    }).as('mockProdList')

    cy.visit('/cypress/fixtures/mockPage.html');
    cy.wait('@mockProdList').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      expect(interception.response.body.products[0].name).to.eq(message.mocked);
    })
  })

  afterEach(() => {
    Cypress.config('baseUrl', baseUrl)
  })
})
