/// <reference types="cypress" />

import HomePage from "../pageObjects/HomePage"
import ProductsPage from "../pageObjects/ProductsPage"
import { searchTerms, user, userUpdate, incorrectPassword } from '../fixtures/api.json'
import CartPage from "../pageObjects/CartPage"



const homePage = new HomePage()
const productsPage = new ProductsPage()
const cartPage = new CartPage

describe('Tests for the sections: Cart, Checkout, Payment', ()=> {

  it('Test Case 12: Add two different products with different quantity to cart', () => {
    homePage.clickProductsHeaderButton()
    productsPage.takeFirstProductName().then((name) => { cy.wrap(name).as('firstProductName') })
    productsPage.takeFirstProductPrice().then((name) => { cy.wrap(name).as('firstProductPrice') })
    productsPage
      .clickFirstProductAddToCartButton()
      .clickContinueShoppingButton()
      .clickFirstProductAddToCartButton()
      .clickContinueShoppingButton()
      .clickSecondProductAddToCartButton()
      .clickViewCartModalButton()
    cartPage.getCartProductsList().should('have.length', 2)
    cartPage.getFirstProductQuantity().should('have.text', '2')
    cartPage.getLastProductQuantity().should('have.text', '1')

    cy.log('Checking that multiply quantity by price function in Cart works correctly for both items')
    cartPage.calculateFirstProductTotalPrice().then((totalPrice) => {
      cartPage.takeFirstProductTotalPriceNumber().should('equal', totalPrice)
    })
    cartPage.calculateLastProductTotalPrice().then((totalPrice) => {
      cartPage.takeLastProductTotalPriceNumber().should('equal', totalPrice)
    })

    cy.log('Checking that the name, price and quantity of the product in the cart matches the previously added one')
    cy.get('@firstProductName').then((firstProductName) => {
      cartPage.getFirstProductName().should('have.text', firstProductName)
    })
    cy.get('@firstProductPrice').then((firstProductPrice) => {
      cartPage.getFirstProductPrice().should('have.text', firstProductPrice)
    })
    cy.log('checking that quantiyty of the product in the cart matches previously added one')
  })

})