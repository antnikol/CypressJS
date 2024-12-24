/// <reference types="cypress" />

import SignUpPage from "../pageObjects/SignUpPage"
import HomePage from "../pageObjects/HomePage"
import LoginPage from "../pageObjects/LoginPage"
import ContactUsPage from "../pageObjects/ContactUsPage"
import CartPage from "../pageObjects/CartPage"
import { user } from '../fixtures/api.json'



const signupPage = new SignUpPage()
const homePage = new HomePage()
const loginPage = new LoginPage()
const contactUsPage = new ContactUsPage()
const cartPage = new CartPage()

describe('Test for the site automationexercise.com', ()=> {

  it('Test Case 6: Contact Us Form', () => {
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

  it('Test Case 10: Verify Subscription in home page', () => {
    homePage
      .scrollToBottom()
      .getSubscriptionFooterSection().should('include.text', 'Subscription')
    homePage
      .typeSubscriptionFooterEmailField(user.email)
      .clickSubscribeButton()
      .getSuccessSubscribeMessage().should('be.visible')
  })

  it('Test Case 11: Verify Subscription in Cart page', () => {
    homePage.clickViewCartHeaderButton()
    cartPage
      .scrollToBottom()
      .getSubscriptionFooterSection().should('include.text', 'Subscription')
    cartPage
      .typeSubscriptionFooterEmailField(user.email)
      .clickSubscribeButton()
      .getSuccessSubscribeMessage().should('be.visible')
  })

})