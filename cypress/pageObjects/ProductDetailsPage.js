/// <reference types="cypress" />

class ProductDetailsPage  {

getProductInformationSection = () => cy.get('.product-information')
getProductName = () => cy.get('.product-information h2')
getProductCategory = () => cy.get('.product-information p').contains('Category')
getProductAvailability = () => cy.get('.product-information p').contains('Availability')
getProductCondition = () => cy.get('.product-information p').contains('Condition')
getProductBrand = () => cy.get('.product-information p').contains('Brand')
getProductPrice = () => cy.get('.product-information span span')



  
}

export default ProductDetailsPage;