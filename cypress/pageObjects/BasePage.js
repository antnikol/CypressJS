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
}

export default BasePage;