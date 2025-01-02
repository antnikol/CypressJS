import HomePage from "../pageObjects/HomePage"

const homePage = new HomePage

beforeEach(() => {
  if (!Cypress.spec.name.includes('api_')) {
    cy.addBrowserToAllure()
    cy.visit('/')
    homePage.getPageUrl().should('eq', 'https://automationexercise.com/')
    homePage.getHeaderHomeIcon().should('have.css', 'color', 'rgb(255, 165, 0)')
    homePage.getSliderSection().should('be.visible')
    homePage.getLeftSideBar().should('be.visible')
    homePage.getFeaturesItemsSection().should('be.visible')
    homePage.getPageTitle().should('include', 'Automation Exercise')
  }
})