/// <reference types="cypress" />
import { liveServerUrl, searchTerms, testUser, testUserUpdate } from '../../fixtures/api.json'

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
      cy.request({
        method: 'POST',
        url: '/api/searchProduct',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
        body: { "search_product": term }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(JSON.parse(response.body).responseCode).to.eq(200)
        expect(JSON.parse(response.body)).to.have.property('products')
        expect(JSON.parse(response.body).products).to.be.an('array')
        expect(JSON.parse(response.body).products[0].name).to.match(new RegExp(term, 'i'));
      })
    })
  })

  it('API 6: POST To Search Product without search_product parameter', () => {
    cy.request({
      method: 'POST',
      url: '/api/searchProduct',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: '' 
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(400)
      expect(JSON.parse(response.body).message).to.eq('Bad request, search_product parameter is missing in POST request.')
    })
  })

  it('API 7: POST To Verify Login with valid details', () => {
    cy.request({
      method: 'POST',
      url: '/api/verifyLogin',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: {
        "email": "test-AQA@gmail.com",
        "password": "123456"
      } 
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(200)
      expect(JSON.parse(response.body).message).to.eq('User exists!')
    })
  })

  it('API 8: POST To Verify Login without email parameter', () => {
    cy.request({
      method: 'POST',
      url: '/api/verifyLogin',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: {"password": "123456" } 
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(400)
      expect(JSON.parse(response.body).message).to.eq('Bad request, email or password parameter is missing in POST request.')
    })
  })

  it('API 9: DELETE To Verify Login', () => {
    cy.request('DELETE', '/api/verifyLogin').then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(405)
      expect(JSON.parse(response.body).message).to.eq('This request method is not supported.')
    })
  })

  it('API 10: POST To Verify Login with invalid details', () => {
    cy.request({
      method: 'POST',
      url: '/api/verifyLogin',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: {
        "email": "test-AQA@gmail.com",
        "password": "" 
      } 
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(404)
      expect(JSON.parse(response.body).message).to.eq('User not found!')
    })
  })

  it('API 11: POST To Create/Register User Account', () => {
    cy.request({
      method: 'POST',
      url: '/api/createAccount',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: testUser
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(201)
      expect(JSON.parse(response.body).message).to.eq('User created!')
    })
  })

  it('API 13: PUT METHOD To Update User Account', () => {
    cy.request({
      method: 'PUT',
      url: '/api/updateAccount',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: testUserUpdate
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(200)
      expect(JSON.parse(response.body).message).to.eq('User updated!')
    })
  })

  it('API 14: GET user account detail by email', () => {
    cy.request('GET', `/api/getUserDetailByEmail?email=${testUser.email}`)   
      .then((response) => {
        console.log(response)
        expect(response.status).to.eq(200)
        expect(JSON.parse(response.body).responseCode).to.eq(200)
        expect(JSON.parse(response.body).user.name).to.eq(testUserUpdate.name)
      })
  })

  it('API 12: DELETE METHOD To Delete User Account', () => {
    cy.request({
      method: 'DELETE',
      url: '/api/deleteAccount',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: {
        "email": testUser.email,
        "password": testUser.password,
      } 
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(JSON.parse(response.body).responseCode).to.eq(200)
      expect(JSON.parse(response.body).message).to.eq('Account deleted!')
    })
  })
})