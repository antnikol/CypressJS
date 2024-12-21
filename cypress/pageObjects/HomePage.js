/// <reference types="cypress" />

import BasePage from "./BasePage";

class HomePage extends BasePage {

getSliderSection = () => cy.get('section[id="slider"]')
getLeftSideBar = () => cy.get('.left-sidebar')
getFeaturesItemsSection = ()=> cy.get('.features_items')
getPageTitle = () => cy.title()
getPageUrl = () => cy.url()



scrollToBottom() {
  cy.scrollTo('bottom')
  return this
} 


}

export default HomePage;