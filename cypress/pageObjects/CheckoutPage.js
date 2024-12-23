/// <reference types="cypress" />

import BasePage from "./BasePage.js"
import LoginPage from "./LoginPage.js"
import PaymentPage from "./PaymentPage.js"

class CheckoutPage extends BasePage {

getCartInfoSection = () => cy.get('#cart_info')
getCartProductDescription = () => cy.get('.cart_description')
getRegisterLoginModalButton = () => cy.get('.modal-body a[href="/login"]')
getAddressDeliverySection = () => cy.get('#address_delivery')
getAddressBillingSection = () => cy.get('#address_invoice')
getDeliveryGenderFirstNameLastName = () => cy.get('#address_delivery .address_firstname.address_lastname').invoke('text')
getDeliveryCompany = () => cy.get('#address_delivery .address_address1.address_address2').eq(0)
getDeliveryAddress = () => cy.get('#address_delivery .address_address1.address_address2').eq(1)
getDeliveryAddress2 = () => cy.get('#address_delivery .address_address1.address_address2').eq(2)
getAllCartProductNameList = () => cy.get('.cart_description a')
getAllCartProductPriceList = () => cy.get('.cart_price p')
getCommentOrderTextField = () => cy.get('textarea[class="form-control"]')
getPlaceOrderButton = () => cy.get('a[href="/payment"]')
getToCartTableSection = () => cy.get('.cart_menu')




clickRegisterLoginModalButton() {
  this.getRegisterLoginModalButton().click()
  return new LoginPage()
}

getSavedVariableAs(variable) {
  return cy.get(`@${variable}`);
}

typeCommentOrderTextField(commentToOrder) {
  this.getCommentOrderTextField().type(commentToOrder)
  return this
}

clickPlaceOrderButton() {
  this.getPlaceOrderButton().click()
  return new PaymentPage()
}

scrollToCartTableSection() {
  this.getToCartTableSection().scrollIntoView({ easing: 'linear', duration: 500 });
  return this
}
}

export default CheckoutPage;