/// <reference types="cypress" />

import SignUpPage from "../pageObjects/SignUpPage"
import HomePage from "../pageObjects/HomePage"
import LoginPage from "../pageObjects/LoginPage"
import { user, incorrectPassword } from '../fixtures/api.json'


const signupPage = new SignUpPage()
const homePage = new HomePage()
const loginPage = new LoginPage()

describe('Test for the site automationexercise.com', ()=> {

  it('Test Case 1: Register User', () => {
    cy.deleteUser()
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
    cy.deleteUserAfterRegistration()
  });

  it('Test Case 2: Login User with correct email and password', () => {
    cy.registerUser()
    homePage
      .clickLogoutButton()
      .clickSignupLoginButton()
    loginPage.getLoginFormHeader().should('have.text', 'Login to your account');
    loginPage
      .typeEmailLoginTextField(user.email)
      .typePasswordLoginTextField(user.password)
      .clickLoginButton()
    homePage.getListHeaderButtons().should('contain', `${user.name}`);
  })

  it('Test Case 3: Login User with incorrect email and password', () => {
    cy.registerUser()
    homePage
      .clickLogoutButton()
      .clickSignupLoginButton()
    loginPage.getLoginFormHeader().should('have.text', 'Login to your account');
    loginPage
      .typeEmailLoginTextField(user.email)
      .typePasswordLoginTextField(incorrectPassword[0])
      .clickLoginButton()
    loginPage.getErrorLoginMessage().should('have.text', 'Your email or password is incorrect!');
  })

  it('Test Case 4: Logout User', () => {
    cy.registerUser()
    homePage
      .clickLogoutButton()
      .clickSignupLoginButton()
    loginPage.getLoginFormHeader().should('have.text', 'Login to your account');
    loginPage
      .typeEmailLoginTextField(user.email)
      .typePasswordLoginTextField(user.password)
      .clickLoginButton()
    homePage.getListHeaderButtons().should('contain', `${user.name}`);
    homePage.clickLogoutButton()
    loginPage.getLoginFormHeader().should('have.text', 'Login to your account');
  })

  it.only('Test Case 5: Register User with existing email', () => {
    cy.registerUser()
    homePage
      .clickLogoutButton()
      .clickSignupLoginButton()
    loginPage.getLoginFormHeader().should('have.text', 'Login to your account');
    loginPage
      .typeNameSignupTextField(user.name)
      .typeEmailSignupTextField(user.email)
      .clickSignupButton()
    loginPage.getErrorSingupMessage().should('have.text', 'Email Address already exist!')
  })

})