/// <reference types="cypress" />

import BasePage from "./BasePage.js"
import ProductDetailsPage from "./ProductDetailsPage"
import CartPage from "./CartPage.js"

class ProductsPage extends BasePage {

getAllProductsHeader = () => cy.get('h2.title')
getAllProductsList = () => cy.get('.productinfo')
getFirstProductItem = () => cy.get('.choose').eq(0)
getAllViewProductButtons = () => cy.get('a[href^="/product_details/"]')
getSearchProductField = () => cy.get('input#search_product')
getSearchButton = () => cy.get('button#submit_search')
getAllProductsNames = () => cy.get('.overlay-content p')
getAllProductsPrices = () => cy.get('.overlay-content h2')
getAllSingleProductsSection = () => cy.get('.single-products')
getContinueShoppingButton = () => cy.get('button[data-dismiss="modal"]')
getViewCartModalButton = () => cy.get('.modal-body a[href="/view_cart"]')



clickFirstViewProductButton() {
  this.getAllViewProductButtons().eq(0).click()
  return new ProductDetailsPage()
}

typeSearchProductField(searchWords) {
  this.getSearchProductField().type(searchWords)
  return this
}

clickSearchButton() {
  this.getSearchButton().click()
  return this
}

checkSearchedProductsNames(searchWords) {
  this.getAllProductsNames().each(($el) => {
    cy.wrap($el).invoke('text').should('match', new RegExp(searchWords, 'i'));
  });
  return this;
}

takeFirstProductPrice() {
  return this.getAllProductsPrices().first().invoke('text')
    .then((text) => {
      return text.trim()
  }) 
}

returnFirstProductPriceOnlyNumber() {
  return this.getAllProductsPrices().first().invoke('text')
    .then((text) => {
      return text.slice(4)
  }) 
}

takeFirstProductName() {
  return this.getAllProductsNames().first().invoke('text')
    .then((text) => {
      return text.trim()
  }) 
}

clickFirstProductAddToCartButton() {
  this.getAllSingleProductsSection().first().scrollIntoView()
  .realHover().find('.product-overlay a.btn')
  .click({ animationDistanceThreshold: 40 })
  return this
}

clickContinueShoppingButton() {
  this.getContinueShoppingButton().click()
  return this
}

clickSecondProductAddToCartButton() {
  this.getAllSingleProductsSection().eq(1).scrollIntoView()
  .realHover().find('.product-overlay a.btn')
  .click({ animationDistanceThreshold: 40 })
  return this
}

returnSecondProductPriceAllText() {
  return this.getAllProductsPrices().eq(1).invoke('text')
    .then((text) => {
      return text.trim()
  }) 
}

returnSecondProductPriceOnlyNumber() {
  return this.getAllProductsPrices().eq(1).invoke('text')
    .then((text) => {
      return text.slice(4)
  }) 
}

returnSecondProductName() {
  return this.getAllProductsNames().eq(1).invoke('text')
    .then((text) => {
      return text.trim()
  }) 
}

clickViewCartModalButton() {
  this.getViewCartModalButton().click()
  return new CartPage()
}
}

export default ProductsPage;