/// <reference types="cypress" />

import BasePage from "./BasePage.js";

class TestCasesPage extends BasePage {

getHeaderTestCasePage = () => cy.get('h2.title')
getAllPagePanelTitles = () => cy.get('.panel-title')
getFeedbackForUsTitle = () => cy.get('.panel-title a').last()

  
}

export default TestCasesPage;