/// <reference types="cypress" />

import HomePage from "../pageObjects/HomePage"
import ProductsPage from "../pageObjects/ProductsPage"
import ProductDetailsPage from "../pageObjects/ProductDetailsPage"
import CartPage from "../pageObjects/CartPage"
import genData from "../fixtures/genData"
import { searchTerms, user, userUpdate, incorrectPassword } from '../fixtures/api.json'



const homePage = new HomePage()
const productsPage = new ProductsPage()
const productDetailsPage = new ProductDetailsPage()
const cartPage = new CartPage()

const product = genData.newProductTestData()

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

  it('Test Case 20: Search Products and Verify Cart After Login', () => {
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

  it('Test Case 21: Add review on product', () => {
    homePage.clickProductsHeaderButton()
    productsPage.getAllProductsHeader().should('have.text', 'All Products')
    productsPage.getPageUrl().should('include', '/products')
    productsPage.clickFirstViewProductButton()
    productDetailsPage.getWriteYourReviewHeader().should('have.text', 'Write Your Review')
    productDetailsPage
      .typeYourNameField(user.name)
      .typeYourEmailField(user.email)
      .typeReviewTextField(product.review)
      .clickSubmitReviewButton()
    productDetailsPage.getReviewSuccessMessage().should('be.visible')
    productDetailsPage.getReviewSuccessMessage().should('have.text', 'Thank you for your review.')     
  })

  it.only('Test Case 19: View & Cart Brand Products', () => {
    homePage.clickProductsHeaderButton()
    productsPage.getLeftSidebarBrandsHeading().should('be.visible').and('have.text','Brands')
    productsPage.getLeftSidebarBrandsList().should('have.length.above', 0)
    
    cy.log('Saving the brand name and quantity of the brand to be selected')
    homePage.getLeftSidebarRandomBrandCount(product.randomLeftSidebarBrandNumber)
      .then((count) => cy.wrap(count).as('brandCount'))
    homePage.getBrandName(product.randomLeftSidebarBrandNumber)
      .then((brandName) => cy.wrap(brandName).as('brandName'))

    cy.log('Verifying user is navigated to brand page and brand products are displayed according to the selection')
    homePage.clickLeftSidebarRandomBrandName(product.randomLeftSidebarBrandNumber)
    productsPage.getLeftSidebarRandomBrandHref(product.randomLeftSidebarBrandNumber)  
      .then((hrefValue) => productsPage.getPageUrl().should('include', hrefValue.replace(/ /g, '%20')) )
    productsPage.getSavedVariableAs('brandName').then((brandName) => { 
      productsPage.getBrandPageSectionHeading().should('have.text', `Brand - ${brandName} Products`)
    })
    productsPage.getSavedVariableAs('brandCount').then((brandCount) => { 
      productsPage.getAllSingleProductsSection().should('have.length', brandCount.replace(/[()]/g, ''))
    })

    cy.log('Saving the brand name and quantity of the brand to be selected')
    homePage.getLeftSidebarRandomBrandCount(product.anotherRandomLeftSidebarBrandNumber)
      .then((count) => cy.wrap(count).as('brandCount'))
    homePage.getBrandName(product.anotherRandomLeftSidebarBrandNumber)
      .then((brandName) => cy.wrap(brandName).as('brandName'))
  
    cy.log('Verifying user is navigated to another brand page and brand products are displayed according to the selection')
    productsPage.clickLeftSidebarRandomBrandName(product.anotherRandomLeftSidebarBrandNumber)
    productsPage.getLeftSidebarRandomBrandHref(product.anotherRandomLeftSidebarBrandNumber)  
      .then((hrefValue) => productsPage.getPageUrl().should('include', hrefValue.replace(/ /g, '%20')) )
    productsPage.getSavedVariableAs('brandName').then((brandName) => { 
      productsPage.getBrandPageSectionHeading().should('have.text', `Brand - ${brandName} Products`)
    })
    productsPage.getSavedVariableAs('brandCount').then((brandCount) => { 
      productsPage.getAllSingleProductsSection().should('have.length', brandCount.replace(/[()]/g, ''))
    })
  })

})