/// <reference types="cypress" />

import HomePage from "../pageObjects/HomePage"
import ProductsPage from "../pageObjects/ProductsPage"
import { searchTerms, user, userUpdate, incorrectPassword } from '../fixtures/api.json'
import ProductDetailsPage from "../pageObjects/ProductDetailsPage"
import TestCasesPage from "../pageObjects/TestCasesPage"



const homePage = new HomePage()
const testCasesPage = new TestCasesPage()
const productsPage = new ProductsPage()
const productDetailsPage = new ProductDetailsPage()

describe('Test for the site automationexercise.com', ()=> {

  it('Test Case 7: Verify Test Cases Page', () => {
    homePage.clickTestCasesHeaderMenuButton()
    testCasesPage.getHeaderTestCasePage().should('have.text', 'Test Cases')
    testCasesPage.getPageTitle().should('include', 'Test Cases')
    testCasesPage.getAllPagePanelTitles().should('have.length.above', 0)
    testCasesPage.getFeedbackForUsTitle().should('have.text', 'Feedback for Us')
  })

})