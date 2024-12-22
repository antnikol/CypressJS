/// <reference types="cypress" />

import HomePage from "../pageObjects/HomePage"
import ProductsPage from "../pageObjects/ProductsPage"
import { searchTerms, user, userUpdate, incorrectPassword } from '../fixtures/api.json'
import ProductDetailsPage from "../pageObjects/ProductDetailsPage"
import CartPage from "../pageObjects/CartPage"



const homePage = new HomePage()
const productsPage = new ProductsPage()
const productDetailsPage = new ProductDetailsPage()
const cartPage = new CartPage()

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

  it.only('Test Case 20: Search Products and Verify Cart After Login', () => {
    cy.registerUser()
    homePage.clickLogoutButton()

    homePage.clickProductsHeaderButton()
    productsPage.getAllProductsHeader().should('have.text', 'All Products')
    productsPage.getPageUrl().should('include', '/products')
    productsPage
      .typeSearchProductField(searchTerms[2])
      .clickSearchButton()
      .getAllProductsHeader().should('have.text', 'Searched Products')
    productsPage.getPageUrl().should('include', '?search')
    productsPage
      .checkSearchedProductsNames(searchTerms[2])
      .clickAllProductsAddToCartButton()
      .clickViewCartHeaderButton()
    cartPage.getActiveBreadcrumbs().should('have.text', 'Shopping Cart')
    cartPage
      .checkSearchedProductNamesInCart(searchTerms[2])
      .checkSearchedProductQuantityInCart(2)

    cy.loginUser()
    homePage.clickViewCartHeaderButton()
    cartPage.getActiveBreadcrumbs().should('have.text', 'Shopping Cart')
    cartPage
      .checkSearchedProductNamesInCart(searchTerms[2])
      .checkSearchedProductQuantityInCart(2)
  })

  it('Test Case 18: View Category Products', () => {
    homePage
      .clickLeftSidebarCategory('Women')
      .clickLeftSidebarSubCategory('Dress')
    productsPage.getAllProductsHeader().should('have.text', 'Women - Dress Products')
    productsPage.getPageTitle().should('equal', 'Automation Exercise - Dress Products')
    productsPage.getPageUrl().should('contain', 'category_products')
    productsPage.checkSearchedProductsNames('Dress')

    productsPage
      .clickLeftSidebarCategory('Men')
      .clickLeftSidebarSubCategory('Jeans')
    productsPage.getAllProductsHeader().should('have.text', 'Men - Jeans Products')
    productsPage.getPageTitle().should('equal', 'Automation Exercise - Jeans Products')
    productsPage.getPageUrl().should('contain', 'category_products')
    productsPage.checkSearchedProductsNames('Jeans')
  })
})