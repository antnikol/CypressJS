// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands'
import 'cypress-real-events'
import 'cypress-file-upload'
import { user } from '../fixtures/api.json'
import HomePage from '../pageObjects/HomePage'
import LoginPage from '../pageObjects/LoginPage'
import BasePage from '../pageObjects/BasePage'
import SignUpPage from '../pageObjects/SignUpPage'

const homePage = new HomePage()
const loginPage = new LoginPage()
const basePage = new BasePage()
const signupPage = new SignUpPage()
const USEREMAIL = user.email;
const PASSWORD = user.password;

Cypress.Commands.add('deleteUser',(userEmail = USEREMAIL, pass = PASSWORD) => {
  cy.visit('/');
  homePage.clickSignupLoginButton()
  loginPage
    .typeEmailLoginTextField(userEmail)
    .typePasswordLoginTextField(pass)
    .clickLoginButton()
    cy.get('body').then(($body) => {
      if ($body.find('form[action="/login"] > p').length > 0) {
        cy.log('Error message found.');
        cy.get('form[action="/login"] > p').should('have.text', 'Your email or password is incorrect!');
      } else {
        cy.log('Error message does not exist in the DOM.');
        homePage.clickDeleteAccountButton();
        basePage.getAccountDeletedConfirmMessage().should('contain', 'Account Deleted!');
      }
    });
});

Cypress.Commands.add('deleteUserAfterRegistration',(userEmail = USEREMAIL, pass = PASSWORD) => {
  cy.visit('/');
  homePage.clickDeleteAccountButton();
  basePage.getAccountDeletedConfirmMessage().should('contain', 'Account Deleted!');
});

Cypress.Commands.add('registerUser',(userEmail = USEREMAIL, pass = PASSWORD) => {
  cy.visit('/');
  cy.deleteUser()
    homePage.clickSignupLoginButton();
    loginPage
      .typeNameSignupTextField(user.name)
      .typeEmailSignupTextField(user.email)
      .clickSignupButton();
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