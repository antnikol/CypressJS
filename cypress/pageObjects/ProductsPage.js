/// <reference types="cypress" />

import ProductDetailsPage from "./ProductDetailsPage"

class ProductsPage  {

getAllProductsHeader = () => cy.get('h2.title')
getAllProductsList = () => cy.get('.productinfo')
getFirstProductItem = () => cy.get('.choose').eq(0)
getAllViewProductButtons = () => cy.get('a[href^="/product_details/"]')



clickFirstViewProductButton() {
  this.getAllViewProductButtons().eq(0).click()
  return new ProductDetailsPage()
}

}

export default ProductsPage;