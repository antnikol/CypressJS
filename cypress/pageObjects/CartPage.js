/// <reference types="cypress" />

import BasePage from "./BasePage.js"

class CartPage extends BasePage {

getCartProductsList = () => cy.get('.cart_product')
getProductQuantityList = () => cy.get('.cart_quantity button')
getProductPricesList = () => cy.get('.cart_price p')
getProductTotalPriceList = () => cy.get('.cart_total_price')
getActiveBreadcrumbs = () => cy.get('.breadcrumb .active')
getDeleteProductFromCartButton = () => cy.get('.cart_quantity_delete')
getEmptyCardSection = () => cy.get('#empty_cart p')
getProductsNamesList = () => cy.get('h4 a')
getProceedToCheckoutButton = () => cy.get('.btn.check_out')

getFirstProductQuantity = () => cy.get('.cart_quantity button').first()
getLastProductQuantity = () => cy.get('.cart_quantity button').last()
getFirstProductPrice = () => cy.get('.cart_price p').first()
getFirstProductTotalPrice = () => cy.get('.cart_total_price').first()
getLastProductPrice = () => cy.get('.cart_price p').last()
getLastProductTotalPrice = () => cy.get('.cart_total_price').last()
getFirstProductName = () => cy.get('.cart_description a').first()



getFirstProductPriceNumber() {
  return this.getProductPricesList().first().invoke('text')
    .then((text) => { return parseFloat( text.slice(4) ) }) 
}

calculateFirstProductTotalPrice() {
  return this.getProductQuantityList().first().invoke('text')
    .then((quantity) => {
      return this.getFirstProductPriceNumber().then((price) => {
        return parseFloat(quantity) * parseFloat(price);
      });
    });
}

getFirstProductTotalPriceNumber() {
  return this.getProductTotalPriceList().first().invoke('text')
    .then((text) => { return parseFloat( text.slice(4) ) }) 
}

getLastProductPriceNumber() {
  return this.getProductPricesList().last().invoke('text')
    .then((text) => { return parseFloat( text.slice(4) ) }) 
}

calculateLastProductTotalPrice() {
  return this.getProductQuantityList().last().invoke('text')
    .then((quantity) => {
      return this.getLastProductPriceNumber().then((price) => {
        return parseFloat(quantity) * parseFloat(price);
      });
    });
}

getLastProductTotalPriceNumber() {
  return this.getProductTotalPriceList().last().invoke('text')
    .then((text) => { return parseFloat( text.slice(4) ) }) 
}

getExpectedFirstProductTotalPrice(quantity) {
  return this.takeFirstProductPrice().invoke('text')
    .then((price) => { return (parseFloat(price) * quantity)  });
}

clickDeleteProductFromCartButton() {
  this.getDeleteProductFromCartButton().click()
  return this
}

checkSearchedProductNamesInCart(searchWords) {
  this.getProductsNamesList().each(($el) => {
    cy.wrap($el).invoke('text').should('match', new RegExp(searchWords, 'i'));
  });
  return this;
}

checkSearchedProductQuantityInCart(quantity) {
  this.getProductQuantityList().each(($el) => {
    cy.wrap($el).invoke('text').should('match', new RegExp(quantity, 'i'));
  });
  return this;
}

getSavedVariableAs(variable) {
  return cy.get(`@${variable}`);
}

clickProceedToCheckoutButton() {
  this.getProceedToCheckoutButton().click()
  return this
}

}

export default CartPage;