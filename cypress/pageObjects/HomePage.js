/// <reference types="cypress" />

import BasePage from "./BasePage";
import CartPage from "./CartPage";

class HomePage extends BasePage {

getSliderSection = () => cy.get('section[id="slider"]')
getLeftSideBar = () => cy.get('.left-sidebar')
getFeaturesItemsSection = ()=> cy.get('.features_items')
getPageTitle = () => cy.title()
getAllAddToCartButtons = () => cy.get('a[data-product-id]')
getViewCartModalButton = () => cy.get('.modal-body a[href="/view_cart"]')
getSliderCarouselSection = () => cy.get('#slider-carousel div.carousel-inner')
getRecommendedItemCarouselSection = () => cy.get('#recommended-item-carousel div.carousel-inner')



clickFirstProductAddToCartButton() {
  this.getAllAddToCartButtons().first().click({force:true})
  return this
}

clickViewCartModalButton() {
  this.getViewCartModalButton().click()
  return new CartPage()
}
}

export default HomePage;