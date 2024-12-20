/// <reference types="cypress" />

import SignUpPage from "../pageObjects/SignUpPage"
import HomePage from "../pageObjects/HomePage"
import LoginPage from "../pageObjects/LoginPage"
import { searchTerms, user, userUpdate } from '../fixtures/api.json'



const signupPage = new SignUpPage()
const homePage = new HomePage()
const loginPage = new LoginPage()

describe('Test for the site automationexercise.com', ()=> {
  beforeEach(() => {
    cy.deleteUser()
    cy.visit('/')
  })

  it('Test Case 1: Register User', () => {
    homePage.clickSignupLoginButton();
    loginPage.getSignupFormHeader().should('have.text', 'New User Signup!');
    loginPage
      .typeNameSignupTextField(user.name)
      .typeEmailSignupTextField(user.email)
      .clickSignupButton();
    signupPage.getCreateAccountButton().should('have.text', 'Create Account');
    signupPage
      .checkTitleMrRadioButton()
      .typePasswordTextField(user.password)
      .selectBirthDay(user.birth_date)
      .selectBirthMonth(user.birth_month)
      .selectBirthYear(user.birth_year)
      .checkNewsletterCheckbox()
      .checkSpecialOffersCheckbox()
      .typeFirstNameTextField(user.firstname)
      .typeLastNameTextField(user.lastname)
      .typeCompanyTextField(user.company)
      .typeAddressTextField(user.address1)
      .typeAddress2TextField(user.address2)
      .selectCountryList(user.country)
      .typeStateTextField(user.state)
      .typeCityTextField(user.city)
      .typeZipCodeTextField(user.zipcode)
      .typeMobileNumberTextField(user.mobile_number)
      .clickCreateAccountButton()
      .clickContinueButton();
    homePage.getListHeaderButtons().should('contain', `${user.name}`);
  });

})