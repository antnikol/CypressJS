/// <reference types="cypress" />

import BasePage from "./BasePage"
import HomePage from "./HomePage"

class SignUpPage extends BasePage {


getTitleMrRadioButton = () => cy.get('input[id="id_gender1"]')
getPasswordTextField = () => cy.get('input[data-qa="password"]')
getAllBirthDays = () => cy.get('select[data-qa="days"]')
getAllBirthMonths = () => cy.get('select[data-qa="months"]')
getAllBirthYears = () => cy.get('select[data-qa="years"]')
getNewsletterCheckbox = () => cy.get('#newsletter')
getSpecialOffersCheckbox = () => cy.get('#newsletter')
getFirstNameTextField = () => cy.get('input[data-qa="first_name"]')
getLastNameTextField = () => cy.get('input[data-qa="last_name"]')
getCompanyTextField = () => cy.get('input[data-qa="company"]')
getAddressTextField = () => cy.get('input[data-qa="address"]')
getAddress2TextField = () => cy.get('input[data-qa="address2"]')
getCountryList = () => cy.get('select[data-qa="country"]')
getStateTextField = () => cy.get('input[data-qa="state"]')
getCityTextField = () => cy.get('input[data-qa="city"]')
getZipCodeTextField = () => cy.get('input[data-qa="zipcode"]')
getMobileNumberTextField = () => cy.get('input[data-qa="mobile_number"]')
getCreateAccountButton = () => cy.get('button[data-qa="create-account"]')
getContinueButton = () => cy.get('a[data-qa="continue-button"]')




checkTitleMrRadioButton() {
  this.getTitleMrRadioButton().check()
  return this
}

typePasswordTextField(password) {
  this.getPasswordTextField().type(password)
  return this
}
  
selectBirthDay(day) {
  this.getAllBirthDays().select(day)
  return this
}

selectBirthMonth(month) {
  this.getAllBirthMonths().select(month)
  return this
}

selectBirthYear(year) {
  this.getAllBirthYears().select(year)
  return this
}

checkNewsletterCheckbox() {
  this.getNewsletterCheckbox().check()
  return this
}

checkSpecialOffersCheckbox() {
  this.getSpecialOffersCheckbox().check()
  return this
}

typeFirstNameTextField(firstName) {
  this.getFirstNameTextField().type(firstName)
  return this
}

typeLastNameTextField(lastName) {
  this.getLastNameTextField().type(lastName)
  return this
}

typeCompanyTextField(company) {
  this.getCompanyTextField().type(company)
  return this
}

typeAddressTextField(address) {
  this.getAddressTextField().type(address)
  return this
}

typeAddress2TextField(address2) {
  this.getAddress2TextField().type(address2)
  return this
}

selectCountryList(country) {
  this.getCountryList().select(country)
  return this
}

typeStateTextField(state) {
  this.getStateTextField().type(state)
  return this
}

typeCityTextField(city) {
  this.getCityTextField().type(city)
  return this
}

typeZipCodeTextField(zipcode) {
  this.getZipCodeTextField().type(zipcode)
  return this
}

typeMobileNumberTextField(mobileNumber) {
  this.getMobileNumberTextField().type(mobileNumber)
  return this
}

clickCreateAccountButton() {
  this.getCreateAccountButton().click()
  return this
}

clickContinueButton() {
  this.getContinueButton().click()
  return new HomePage()
}

}

export default SignUpPage;