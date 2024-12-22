/// <reference types="cypress" />

class BasePage  {

  getSignupLoginButton = () => cy.get('a[href="/login"]')
  getListHeaderButtons = () => cy.get('.nav.navbar-nav')
  getDeleteAccountButton = () => cy.get('a[href="/delete_account"]')
  getAccountDeletedConfirmMessage = () => cy.get('h2[data-qa="account-deleted"]')
  getLogoutButton = () => cy.get('a[href="/logout"]')
  getHeaderHomeIcon = () => cy.get(".fa-home")
  getContactUsButton = () => cy.get('a[href="/contact_us"]')
  getProductsHeaderButton = () => cy.get('.shop-menu a[href="/products"]')
  getSubscriptionFooterSection = () => cy.get('.single-widget')
  getSubscriptionFooterEmailField = () => cy.get('#susbscribe_email')
  getSubscribeButton = () => cy.get('button#subscribe')
  getSuccessSubscribeMessage = () => cy.get('.alert-success.alert')
  getViewCartHeaderButton = () => cy.get('.shop-menu a[href="/view_cart"]')
  getTestCasesHeaderMenuButton = () => cy.get('.nav a[href="/test_cases"]')
  getPageTitle = () => cy.title()
  getPageUrl = () => cy.url()
  

  clickSignupLoginButton() {
    this.getSignupLoginButton().click()
    return this
  }

  clickDeleteAccountButton() {
    this.getDeleteAccountButton().click()
    return this
  }

  clickLogoutButton() {
    this.getLogoutButton().click()
    return this
  }

  clickContactUsButton() {
    this.getContactUsButton().click()
    return this
  }

  clickProductsHeaderButton() {
    this.getProductsHeaderButton().click()
    return this
  }

  typeSubscriptionFooterEmailField(subscriptionEmail) {
    this.getSubscriptionFooterEmailField().type(subscriptionEmail)
    return this
  }

  clickSubscribeButton() {
    this.getSubscribeButton().click()
    return this
  }

  clickViewCartHeaderButton() {
    this.getViewCartHeaderButton().click()
    return this
  }

  scrollToBottom() {
    cy.window().then((win) => {
      if (win.document.body.scrollHeight > win.innerHeight) {
        cy.scrollTo('bottom')
      }
    })
    return this
  } 

  clickTestCasesHeaderMenuButton() {
    this.getTestCasesHeaderMenuButton().click()
    return this
  }
}

export default BasePage;