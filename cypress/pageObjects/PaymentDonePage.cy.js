/// <reference types="cypress" />

import BasePage from "./BasePage.js";

class PaymentDonePage extends BasePage {

getOrderPlacedHeading = () => cy.get('h2[data-qa="order-placed"]')
getOrderPlacedMessage = () => cy.get('h2[data-qa="order-placed"] + p')



}

export default PaymentDonePage;