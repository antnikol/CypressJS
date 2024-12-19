/// <reference types="cypress" />
import { liveServerUrl, searchTerms } from '../../fixtures/api.json'

describe('API tests for the site automationexercise.com', ()=> {

  it('API 1: Get All Products List', () => {
    cy.request('GET', '/api/productsList').then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(200)
      expect(JSON.parse(response.body)).to.have.property('products')
      expect(JSON.parse(response.body).products).to.be.an('array') 
      expect(JSON.parse(response.body).products).to.have.length.above(0)
    })
  })

  it('API 1(2): Get All Products List (with @alias)', () => {
    cy.request('GET', '/api/productsList').as('prodList')
    
    cy.get('@prodList').then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it.skip('API 1(3): __Mocked_DATA__ Get All Products List', () => {
    cy.intercept('GET', '/api/productsList', {
      statusCode: 201,
      body: {
        products: [ { name: 'Mocked Data' } ],
      }
    }).as('mockProdList')

    cy.visit(liveServerUrl);

    cy.wait('@mockProdList').then((interception) => {
      expect(interception.response.statusCode).to.eq(201)
      expect(interception.response.body.products[0].name).to.eq('Mocked Data')
    })
  })

  it('API 2: POST To All Products List', () => {
    cy.request('POST', '/api/productsList').then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(405)
      expect(JSON.parse(response.body).message).to.eq('This request method is not supported.')
    })
  })

  it('API 3: Get All Brands List', () => {
    cy.request('GET', '/api/brandsList').then((response) => {
      console.log(response)
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(200)
      expect(JSON.parse(response.body)).to.have.property('brands')
      expect(JSON.parse(response.body).brands).to.be.an('array')
      expect(JSON.parse(response.body).brands).to.have.length.above(0)
      expect(JSON.parse(response.body).brands[0]).to.have.property('brand')
    })
  })

  it('API 4: PUT To All Brands List', () => {
    cy.request('PUT', '/api/brandsList').then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(405)
      expect(JSON.parse(response.body).message).to.eq('This request method is not supported.')
    })
  })

  searchTerms.forEach((term) => {
    it('API 5: POST To Search Product (Positive test + preconditions(at least one item that contain "top"-word in name is present)', () => {
      let top = 'top'
      cy.request({
        method: 'POST',
        url: 'https://automationexercise.com/api/searchProduct',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
        body: `search_product=${term}` 
      }).then((response) => {
        console.log(response)
        expect(response.status).to.eq(200)
        expect(JSON.parse(response.body).responseCode).to.eq(200)
        expect(JSON.parse(response.body)).to.have.property('products')
        expect(JSON.parse(response.body).products).to.be.an('array')
        expect(JSON.parse(response.body).products[0].name).to.match(new RegExp(term, 'i'));
      })
    })
  })

})