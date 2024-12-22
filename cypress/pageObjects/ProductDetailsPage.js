/// <reference types="cypress" />

import BasePage from "./BasePage.js"
import CartPage from "./CartPage.js"

class ProductDetailsPage extends BasePage {

getProductInformationSection = () => cy.get('.product-information')
getProductName = () => cy.get('.product-information h2')
getProductCategory = () => cy.get('.product-information p').contains('Category')
getProductAvailability = () => cy.get('.product-information p').contains('Availability')
getProductCondition = () => cy.get('.product-information p').contains('Condition')
getProductBrand = () => cy.get('.product-information p').contains('Brand')
getProductPrice = () => cy.get('.product-information span span')
getProductQuantityField = () => cy.get('#quantity')
getAddToCartButton = () => cy.get('button.btn.btn-default.cart')
getViewCartModalButton = () => cy.get('.modal-body a[href="/view_cart"]')


clearProductQuantityField() {
  this.getProductQuantityField().clear()
  return this
}

typeProductQuantityField(quantity) {
  this.getProductQuantityField().type(quantity)
  return this
}

clickAddToCartButton() {
  this.getAddToCartButton().click()
  return this
}

clickViewCartModalButton() {
  this.getViewCartModalButton().click()
  return this
}
  
}

export default ProductDetailsPage;