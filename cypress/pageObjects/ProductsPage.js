/// <reference types="cypress" />

import BasePage from "./BasePage.js"
import ProductDetailsPage from "./ProductDetailsPage"

class ProductsPage extends BasePage {

getAllProductsHeader = () => cy.get('h2.title')
getAllProductsList = () => cy.get('.productinfo')
getFirstProductItem = () => cy.get('.choose').eq(0)
getAllViewProductButtons = () => cy.get('a[href^="/product_details/"]')
getSearchProductField = () => cy.get('input#search_product')
getSearchButton = () => cy.get('button#submit_search')
getAllProductsNames = () => cy.get('.overlay-content p')


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

}

export default ProductsPage;