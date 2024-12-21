/// <reference types="cypress" />

import SignUpPage from "../pageObjects/SignUpPage"
import HomePage from "../pageObjects/HomePage"
import LoginPage from "../pageObjects/LoginPage"
import { searchTerms, user, userUpdate, incorrectPassword } from '../fixtures/api.json'
import ContactUsPage from "../pageObjects/ContactUsPage"



const signupPage = new SignUpPage()
const homePage = new HomePage()
const loginPage = new LoginPage()
const contactUsPage = new ContactUsPage

describe('Test for the site automationexercise.com', ()=> {

  it('Test Case 8: Verify All Products and product detail page', () => {
    cy.get('.shop-menu a[href="/products"]').contains(/\s*Products\s*/).click()
    cy.get('h2.title').should('have.text', 'All Products')
    cy.get('.product-overlay').should('have.length.above', 0)
    cy.get('.choose').eq(0).contains('View Product').click()
    cy.get('.product-information').should('be.visible')
  })



})