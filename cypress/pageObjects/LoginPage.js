/// <reference types="cypress" />

class LoginPage  {

const 

getSignupFormHeader = () => cy.get('.signup-form > h2')
getSignupNameTextField = () => cy.get('input[data-qa="signup-name"]')
getSignupEmailTextField = () => cy.get('input[data-qa="signup-email"]')
getSignupButton = () => cy.get('button[data-qa="signup-button"]')
getLoginFormHeader = () => cy.get('.login-form > h2')
getLoginEmailTextField = () => cy.get('input[data-qa="login-email"]')
getLoginPasswordTextField = () => cy.get('input[data-qa="login-password"]')
getLoginButton = () => cy.get('button[data-qa="login-button"]')
getErrorLoginMessage = () => cy.get('form[action="/login"] > p')
getErrorSingupMessage = () => cy.get('form[action="/signup"] > p')




typeNameSignupTextField(userName) {
  this.getSignupNameTextField().type(userName)
  return this
}

typeEmailSignupTextField(userEmail) {
  this.getSignupEmailTextField().type(userEmail)
  return this
}

clickSignupButton() {
  this.getSignupButton().click()
  return this
}

typeEmailLoginTextField(userEmail) {
  this.getLoginEmailTextField().type(userEmail)
  return this
}

typePasswordLoginTextField(userPassword) {
  this.getLoginPasswordTextField().type(userPassword)
  return this
}

clickLoginButton() {
  this.getLoginButton().click()
  return this
}

}

export default LoginPage;