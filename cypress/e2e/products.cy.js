/// <reference types="cypress" />

import HomePage from "../pageObjects/HomePage"
import ProductsPage from "../pageObjects/ProductsPage"
import { searchTerms, user, userUpdate, incorrectPassword } from '../fixtures/api.json'
import ProductDetailsPage from "../pageObjects/ProductDetailsPage"



const homePage = new HomePage()
const productsPage = new ProductsPage()
const productDetailsPage = new ProductDetailsPage()

describe('Test for the site automationexercise.com', ()=> {

  it('Test Case 8: Verify All Products and product detail page', () => {
    homePage.clickProductsHeaderButton()
    productsPage.getAllProductsHeader().should('have.text', 'All Products')
    productsPage.getAllProductsList().should('have.length.above', 0)
    productsPage.clickFirstViewProductButton()
    productDetailsPage.getProductInformationSection().should('be.visible')
    productDetailsPage.getProductName().should('be.visible')
    productDetailsPage.getProductPrice().should('be.visible')
    productDetailsPage.getProductAvailability().should('be.visible')
    productDetailsPage.getProductCondition().should('be.visible')
    productDetailsPage.getProductBrand().should('be.visible')
  })

  it('Test Case 9: Search Product', () => {
    homePage.clickProductsHeaderButton()
    productsPage.getAllProductsHeader().should('have.text', 'All Products')
    productsPage
      .typeSearchProductField(searchTerms[2])
      .clickSearchButton()
      .getAllProductsHeader().should('have.text', 'Searched Products')
    productsPage.checkSearchedProductsNames(searchTerms[2])
  })

})