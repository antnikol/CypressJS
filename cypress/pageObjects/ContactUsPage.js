/// <reference types="cypress" />

import HomePage from "./HomePage"

class ContactUsPage  {

getGetInTouchHeader = () => cy.get('.contact-form h2')
getNameTextField = () => cy.get('input[data-qa="name"]')
getEmailTextField = () => cy.get('input[data-qa="email"]')
getSubjectTextField = () => cy.get('input[data-qa="subject"]')
getMessageTextField = () => cy.get('textarea[data-qa="message"]')
getAttachFileField = () => cy.get('input[type="file"]')
getSubmitButton = () => cy.get('input[data-qa="submit-button"]')
getSuccessMessage = () => cy.get('.status.alert.alert-success')
getBackToHomePageButton = () => cy.get('a.btn.btn-success')


typeNameTextField(name) {
  this.getNameTextField().type(name)
  return this
}

typeEmailTextField(email) {
  this.getEmailTextField().type(email)
  return this
}

typeSubjectTextField(subject) {
  this.getSubjectTextField().type(subject)
  return this
}
  
typeMessageTextField(message) {
  this.getMessageTextField().type(message)
  return this
}

clickAndAttachFile(fileName) {
  this.getAttachFileField().attachFile(fileName)
  return this
}

waitAndConfirmAlertWindow() {
  cy.on('window:alert', () => {})
  return this
}

clickSubmitButton() {
  this.getSubmitButton().click()
  return this
}

clickBackToHomePageButton() {
  this.getBackToHomePageButton().click()
  return new HomePage()
}

}

export default ContactUsPage;