/// <reference types="cypress" />

class BasePage  {

  getSignupLoginButton = () => cy.get('.nav a[href="/login"]')
  getListHeaderButtons = () => cy.get('.nav.navbar-nav')
  getDeleteAccountButton = () => cy.get('a[href="/delete_account"]')
  getAccountDeletedConfirmMessage = () => cy.get('h2[data-qa="account-deleted"]')
  getLogoutButton = () => cy.get('a[href="/logout"]')
  getHeaderHomeIcon = () => cy.get(".fa-home")
  getContactUsButton = () => cy.get('a[href="/contact_us"]')
  getProductsHeaderButton = () => cy.get('.shop-menu a[href="/products"]')
  getSubscriptionFooterSection = () => cy.get('.single-widget h2')
  getSubscriptionFooterEmailField = () => cy.get('#susbscribe_email')
  getSubscribeButton = () => cy.get('button#subscribe')
  getSuccessSubscribeMessage = () => cy.get('.alert-success.alert')
  getViewCartHeaderButton = () => cy.get('.shop-menu a[href="/view_cart"]')
  getTestCasesHeaderMenuButton = () => cy.get('.nav a[href="/test_cases"]')
  getPageTitle = () => cy.title()
  getPageUrl = () => cy.url()
  getScrollUpButton = () => cy.get('#scrollUp')
  getCopyrightText = () => cy.get('.footer-bottom .pull-left')
  getActiveBreadcrumbs = () => cy.get('.breadcrumb .active')
  getRegisterLoginModalButton = () => cy.get('.modal-body a[href="/login"]')

  //Left-Sidebar
  getLeftSidebarCategoryList = () => cy.get('a[data-parent="#accordian"]')
  getLeftSidebarSubCategoryList = () => cy.get('.panel-body a')
  

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

  typeSubscriptionFooterEmailField(subscriptionEmail) {
    this.getSubscriptionFooterEmailField().type(subscriptionEmail)
    return this
  }

  clickSubscribeButton() {
    this.getSubscribeButton().click()
    return this
  }

  clickViewCartHeaderButton() {
    this.getViewCartHeaderButton().click()
    return this
  }

  scrollToBottom() {
    cy.window().then((win) => {
      if (win.document.body.scrollHeight > win.innerHeight) {
        cy.scrollTo('bottom')
      }
    })
    return this
  } 

  scrollToTop() {
    cy.window().then((win) => {
      if (win.document.body.scrollHeight > win.innerHeight) {
        cy.scrollTo('top')
      }
    })
    return this
  } 

  clickTestCasesHeaderMenuButton() {
    this.getTestCasesHeaderMenuButton().click()
    return this
  }

  clickLeftSidebarCategory(categoryName) {
    this.getLeftSidebarCategoryList().contains(categoryName).click()
    return this
  }

  clickLeftSidebarSubCategory(subCategoryName) {
    this.getLeftSidebarSubCategoryList().contains(subCategoryName).click()
    return this
  }

  clickScrollUpButton() {
    this.getScrollUpButton().click()
    return this
  }

  clickRegisterLoginModalButton() {
    this.getRegisterLoginModalButton().click()
    return this
  }

}

export default BasePage;