/// <reference types="cypress" />

class BasePage  {

  getSignupLoginButton = () => cy.get('a[href="/login"]')
  getListHeaderButtons = () => cy.get('.nav.navbar-nav')
  getDeleteAccountButton = () => cy.get('a[href="/delete_account"]')
  getAccountDeletedConfirmMessage = () => cy.get('h2[data-qa="account-deleted"]')
  

  clickSignupLoginButton() {
    this.getSignupLoginButton().click()
    return this
  }

  clickDeleteAccountButton() {
    this.getDeleteAccountButton().click()
    return this
  }

}

export default BasePage;