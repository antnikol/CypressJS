/// <reference types="cypress" />

describe('Test for the site automationexercise.com', ()=> {
  let new_brach = 'new_branch'
  let userName = 'test-AQA user'
  let userEmail = 'test-AQA@gmail.com'
  let userEmailDelete = 'delete-AQA@gmail.com'
  let userPassword = '123456'
  let first_name = 'Anton'
  let last_name = 'K'
  let company = 'test_company_name'
  let address = 'Yavornitskogo str., build 100,'
  let address2 = 'US, FL'
  let country = 'United States'
  let state = 'FL'
  let city = 'Miami'
  let zipcode = '33101'
  let mobile_number = '1-703-555-567'
  let birth_year = '1999'
  let birth_month = 'January'
  let birth_day = '1'
  let gender = 'Mr'



  it('Test Case 19: View & Cart Brand Products', () => {
    let brandName, brandCount, brand, categoryHrefBrand
    cy.get('.shop-menu a[href="/products"]').click()
    cy.get('.brands_products h2').should('be.visible').and('have.text','Brands')
    cy.get('.brands-name li').should('have.length.above', 0)
    cy.get('.brands-name li a').eq(1).invoke('text').then((text) => {
      brandName = text.trim()
      cy.get('.brands-name li a span').eq(1).invoke('text').then((text2) => {
        brandCount = text2.trim()
        brand = brandName.replace(brandCount, '').trim()
        })
      })
    cy.get('.brands-name li a').eq(1).invoke('attr','href').then((hrefValue) => {
      categoryHrefBrand = hrefValue.trim() 
      cy.get('.brands-name li a').eq(1).click()
      cy.url().should('include', categoryHrefBrand)
    })
    cy.then(() => {
      cy.get('div.features_items h2').should('include.text', brand)
    })
    cy.get('.single-products').should('have.length.above', 0)
    cy.get('.brands-name li a').eq(0).invoke('attr','href').then((hrefValue) => {
      categoryHrefBrand = hrefValue.trim() 
      cy.get('.brands-name li a').eq(0).click()
      cy.url().should('include', categoryHrefBrand)
    })
    cy.get('.brands-name li a').eq(0).invoke('text').then((text) => {
      brandName = text.trim()
      cy.get('.brands-name li a span').eq(0).invoke('text').then((text2) => {
        brandCount = text2.trim()
        brand = brandName.replace(brandCount, '').trim()
        })
      })
    cy.then(() => {
      cy.get('div.features_items h2').should('include.text', brand)
    })
    cy.get('.single-products').should('have.length.above', 0)
  })

  
})