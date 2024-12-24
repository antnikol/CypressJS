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
getRecommendedItemCarouselSectionActive = () => cy.get('#recommended-item-carousel .item.active')
getCarouselRecommendedItemNamesList = () => cy.get('#recommended-item-carousel .item.active p')
getCarouselRecommendedItemAddToCartButtonssList = () => cy.get('#recommended-item-carousel .item.active a.add-to-cart')
getAllProductsNames = () => cy.get('.overlay-content p')
getAllProductsPrices = () => cy.get('.overlay-content h2')




clickFirstProductAddToCartButton() {
  this.getAllAddToCartButtons().first().click({force:true})
  return this
}

clickViewCartModalButton() {
  this.getViewCartModalButton().click()
  return new CartPage()
}

clickAddToCartRecommendedItemCarousel(itemNumber) {
  this.getRecommendedItemCarouselActive().eq(itemNumber).click()
  return new CartPage()
}

getCarouselRecommendedItemName(randomCarouselNumber) {
  return this.getCarouselRecommendedItemNamesList().eq(randomCarouselNumber).invoke('text')
}

clickCarouselRecommendedItemAddToCartButton(randomCarouselNumber) {
  this.getCarouselRecommendedItemAddToCartButtonssList().eq(randomCarouselNumber).click()
  return this
}

scrollToCarouselRecommendedItems() {
  this.getRecommendedItemCarouselSection().scrollIntoView({ easing: 'linear', duration: 500 });
  return this
}

getFirstProductName() {
  return this.getAllProductsNames().first().invoke('text')
    .then((text) => { return text.trim() }) 
} 

takeFirstProductPrice() {
  return this.getAllProductsPrices().first().invoke('text')
    .then((text) => { return text.trim() }) 
}

}

export default HomePage;