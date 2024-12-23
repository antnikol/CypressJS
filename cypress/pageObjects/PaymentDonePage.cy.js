/// <reference types="cypress" />

import BasePage from "./BasePage.js";

class PaymentDonePage extends BasePage {

getOrderPlacedHeading = () => cy.get('h2[data-qa="order-placed"]')
getOrderPlacedMessage = () => cy.get('h2[data-qa="order-placed"] + p')
getDownloadInvoiceButton = () => cy.get('.btn.btn-default.check_out')
getContinuePlacedOrderButton = () => cy.get('a[data-qa="continue-button"]')


clickDownloadInvoiceButton() {
  this.getDownloadInvoiceButton().click()
  return this
}

clickContinuePlacedOrderButton() {
  this.getContinuePlacedOrderButton().click()
  return this
}


}

export default PaymentDonePage;