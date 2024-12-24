/// <reference types="cypress" />

import HomePage from "../pageObjects/HomePage"
import ProductsPage from "../pageObjects/ProductsPage"
import ProductDetailsPage from "../pageObjects/ProductDetailsPage"
import TestCasesPage from "../pageObjects/TestCasesPage"
import { user } from '../fixtures/api.json'


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

  it.only('Test Case 25: Verify Scroll Up using "Arrow" button and Scroll Down functionality', () => {
    homePage.scrollToBottom()
    homePage.getCopyrightText().should('be.visible')
    homePage.getCopyrightText().should('have.text', 'Copyright © 2021 All rights reserved')
    homePage.getCopyrightText().should(($el) => {
      const rect = $el[0].getBoundingClientRect()
      expect(rect.top).to.be.greaterThan(0)
      expect(rect.bottom).to.be.lessThan(Cypress.config('viewportHeight'))
    })
    homePage.clickScrollUpButton()
    homePage.getSliderCarouselSection().should('be.visible')
    homePage.getSliderCarouselSection().should('contain', 'Full-Fledged practice website for Automation Engineers')
    homePage.getSliderCarouselSection().should(($el) => {
      const rect = $el[0].getBoundingClientRect()
      expect(rect.top).to.be.greaterThan(0)
      expect(rect.bottom).to.be.lessThan(Cypress.config('viewportHeight'))
    })
  })

  it('Test Case 26: Verify Scroll Up without "Arrow" button and Scroll Down functionality', () => {
    homePage.scrollToBottom()
    homePage.getCopyrightText().should('be.visible')
    homePage.getCopyrightText().should('have.text', 'Copyright © 2021 All rights reserved')
    homePage.getCopyrightText().should(($el) => {
      const rect = $el[0].getBoundingClientRect()
      expect(rect.top).to.be.greaterThan(0)
      expect(rect.bottom).to.be.lessThan(Cypress.config('viewportHeight'))
    })
    homePage.scrollToTop()
    homePage.getSliderCarouselSection().should('be.visible')
    homePage.getSliderCarouselSection().should('contain', 'Full-Fledged practice website for Automation Engineers')
    homePage.getSliderCarouselSection().should(($el) => {
      const rect = $el[0].getBoundingClientRect()
      expect(rect.top).to.be.greaterThan(0)
      expect(rect.bottom).to.be.lessThan(Cypress.config('viewportHeight'))
    })
  })

})