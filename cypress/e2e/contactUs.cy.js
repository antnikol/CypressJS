/// <reference types="cypress" />

import SignUpPage from "../pageObjects/SignUpPage"
import HomePage from "../pageObjects/HomePage"
import LoginPage from "../pageObjects/LoginPage"
import { searchTerms, user, userUpdate, incorrectPassword } from '../fixtures/api.json'
import ContactUsPage from "../pageObjects/ContactUsPage"



const signupPage = new SignUpPage()
const homePage = new HomePage()
const loginPage = new LoginPage()
const contactUsPage = new ContactUsPage

describe('Test for the site automationexercise.com', ()=> {

  it.only('Test Case 6: Contact Us Form', () => {
    homePage.clickContactUsButton()
    homePage.getPageUrl().should('contain', '/contact_us')
    contactUsPage.getGetInTouchHeader().should('contain', 'Get In Touch')
    contactUsPage
      .typeNameTextField(user.name)
      .typeEmailTextField(user.email)
      .typeSubjectTextField('Subject text for test')
      .typeMessageTextField('Message text for test')
      .clickAndAttachFile('/example.json')
      .waitAndConfirmAlertWindow()
      .clickSubmitButton()
      .getSuccessMessage().should('have.text', 'Success! Your details have been submitted successfully.')
    contactUsPage.clickBackToHomePageButton()
    homePage.getPageTitle().should('include', 'Automation Exercise')

  })  


})