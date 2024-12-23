/// <reference types="cypress" />

import BasePage from "./BasePage.js";

class PaymentPage extends BasePage {

getHeadingOfSection = () => cy.get('.step-one h2')
getPaymentInformation = () => cy.get('.payment-information')
getNameOnCardTextField = () => cy.get('input[data-qa="name-on-card"]')
getCardNumberTextField = () => cy.get('input[data-qa="card-number"]')
getCardCvvTextField = () => cy.get('input[data-qa="cvc"]')
getCardExpiryMonthTextField = () => cy.get('input[data-qa="expiry-month"]')
getCardExpiryYearTextField = () => cy.get('input[data-qa="expiry-year"]')
getPayAndConfirmOrderButton = () => cy.get('button[data-qa="pay-button"]')
getSuccessOrderMessage = () => cy.get('#success_message > .alert-success', { timeout: 5000 })





typeNameOnCardTextField(name, lastname) {
  this.getNameOnCardTextField().type(`${name} ${lastname}`)
  return this
}

typeCardNumberTextField(cardNumber) {
  this.getCardNumberTextField().type(cardNumber)
  return this
}

typeCardCvvTextField(cardCvv) {
  this.getCardCvvTextField().type(cardCvv)
  return this
}

typeCardExpiryMonthTextField(exMonth) {
  this.getCardExpiryMonthTextField().type(exMonth)
  return this
}

typeCardExpiryYearTextField(exYear) {
  this.getCardExpiryYearTextField().type(exYear)
  return this
}

clickPayAndConfirmOrderButton() {
  this.getPayAndConfirmOrderButton().click()
  return this
}
}

export default PaymentPage;