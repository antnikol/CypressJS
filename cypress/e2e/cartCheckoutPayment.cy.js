/// <reference types="cypress" />

import HomePage from "../pageObjects/HomePage"
import ProductsPage from "../pageObjects/ProductsPage"
import CartPage from "../pageObjects/CartPage"
import ProductDetailsPage from "../pageObjects/ProductDetailsPage"
import genData from "../fixtures/genData";
import { searchTerms, user, userUpdate, incorrectPassword } from '../fixtures/api.json'



const homePage = new HomePage()
const productsPage = new ProductsPage()
const cartPage = new CartPage()
const productDetailsPage = new ProductDetailsPage()

const product = genData.newProductTestData()

describe('Tests for the sections: Cart, Checkout, Payment', ()=> {

  it('Test Case 12: Hover and click "Add to cart" button for two different products with different quantity', () => {
    homePage.clickProductsHeaderButton()
    productsPage.takeFirstProductName().then((name) => { cy.wrap(name).as('firstProductName') })
    productsPage.takeFirstProductPrice().then((name) => { cy.wrap(name).as('firstProductPrice') })
    productsPage
      .resetCounterClickFirstProductAddToCartButton()
      .clickFirstProductAddToCartButton()
      .clickContinueShoppingButton()
      .clickFirstProductAddToCartButton()
      .clickContinueShoppingButton()
      .clickSecondProductAddToCartButton()
      .clickViewCartModalButton()
    cartPage.getCartProductsList().should('have.length', 2)
    cartPage.getFirstProductQuantity().should('have.text', productsPage.takeCounterClickFirstProductAddToCartButton())
    cartPage.getLastProductQuantity().should('have.text', '1')

    cy.log('Checking that multiply quantity by price function in Cart works correctly for both items')
    cartPage.calculateFirstProductTotalPrice().then((totalPrice) => {
      cartPage.takeFirstProductTotalPriceNumber().should('equal', totalPrice)
    })
    cartPage.calculateLastProductTotalPrice().then((totalPrice) => {
      cartPage.takeLastProductTotalPriceNumber().should('equal', totalPrice)
    })

    cy.log('Checking that the name, price of the product in the cart matches the previously added one')
    cy.get('@firstProductName').then((firstProductName) => {
      cartPage.getFirstProductName().should('have.text', firstProductName)
    })
    cy.get('@firstProductPrice').then((firstProductPrice) => {
      cartPage.getFirstProductPrice().should('have.text', firstProductPrice)
    })
  })

  it('Test Case 13: Verify product quantity in Cart by add from "Product details page"', () => {
    homePage.clickProductsHeaderButton()
    productsPage.clickFirstViewProductButton()
    productDetailsPage.getProductInformationSection().should('be.visible')
    productDetailsPage
      .clearProductQuantityField()
      .typeProductQuantityField(product.quantity)
      .clickAddToCartButton()
      .clickViewCartModalButton()
    cartPage.getCartProductsList().should('have.length', 1)
    cartPage.getProductQuantityList().should('have.text', product.quantity)
  }) 

  it.only('Test Case 17: Remove Products From Cart', () => {
    homePage
      .clickFirstProductAddToCartButton()
      .clickViewCartModalButton()
    cartPage.getCartProductsList().should('have.length', 1)
    cartPage.getPageUrl().should('include', '/view_cart')
    cartPage.getPageTitle().should('equal', 'Automation Exercise - Checkout')
    cartPage.getActiveBreadcrumbs().should('have.text', 'Shopping Cart')
    cartPage.clickDeleteProductFromCartButton()
    cartPage.getEmptyCardSection().should('contain', 'Cart is empty!')
  })

})