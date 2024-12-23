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


  it('Test Case 14: Place Order: Register while Checkout', () => {
    let price1psc, price1pscNum, goodName
    cy.get('.overlay-content h2').eq(0).invoke('text')
      .then((text) => {
        price1psc = text.trim()
        price1pscNum = text.slice(4)
    })
    cy.get('.overlay-content p').eq(0).invoke('text')
      .then((text) => {
        goodName = text.trim()
      })
    cy.then(() => {
      cy.log('Price:', price1psc);
      cy.log('Good Name:', goodName);
      cy.log('Price as Number:', price1pscNum);
    })
    
    cy.get('.choose').eq(0).contains('View Product').click()
    cy.get('.product-information').should('be.visible')
    cy.get('#quantity').clear().type('4')
    cy.get('.btn.btn-default.cart').click()
    cy.get('.modal-body a[href="/view_cart"]').click()
    cy.get('.table-responsive').should('exist')
    cy.url().should('include', '/view_cart')
    cy.title().should('equal', 'Automation Exercise - Checkout')
    cy.get('.cart_product').should('have.length', 1)
    cy.get('.breadcrumbs').should('include.text', 'Shopping Cart')
    cy.get('.btn.btn-default.check_out').contains('Proceed To Checkout').click()
    cy.get('.modal-body a[href="/login"]').click()

    cy.contains(/New User Signup!/i).should('be.visible')
    cy.get(".signup-form").should('contain', 'New User Signup!')
    cy.get('input[data-qa="signup-name"]').type(userName)
    cy.get('input[data-qa="signup-email"]').type(userEmailDelete)
    cy.get('button[data-qa="signup-button"]').click()
    // Checking for an already registered user and error message "Email Address already exist!"
    cy.get('body').then(($body) => {
      if ($body.find('p[style="color: red;"]').length) {
        cy.get('input[data-qa="login-email"]').type(userEmailDelete)
        cy.get('input[data-qa="login-password"]').type(userPassword)
        cy.get('button[data-qa="login-button"]').click()
        cy.get('a[href="/delete_account"]').click()
        cy.get('a[href="/login"]').click()
        cy.get('input[data-qa="signup-name"]').type(userName)
        cy.get('input[data-qa="signup-email"]').type(userEmailDelete)
        cy.get('button[data-qa="signup-button"]').click()
      }
    })
    cy.contains(/Enter Account Information/i).should('be.visible')
    cy.get('#id_gender1').click()
    cy.get('input[data-qa="password"]').type(userPassword)
    cy.get('select[data-qa="days"]').select(1)
    cy.get('select[data-qa="months"]').select(1)
    cy.get('select[data-qa="years"]').select('1999')
    cy.get('#newsletter').check()
    cy.get('#optin').check()
    cy.get('input[data-qa="first_name"]').type('Anton')
    cy.get('input[data-qa="last_name"]').type('K')
    cy.get('input[data-qa="company"]').type('test_company_name')
    cy.get('input[data-qa="address"]').type('Yavornitskogo str., build 100,')
    cy.get('input[data-qa="address2"]').type('US, FL')
    cy.get('select[data-qa="country"]').select('United States')
    cy.get('input[data-qa="state"]').type('FL')
    cy.get('input[data-qa="city"]').type('Miami')
    cy.get('input[data-qa="zipcode"]').type('33101')
    cy.get('input[data-qa="mobile_number"]').type('1-703-555-567')
    cy.get('button[data-qa="create-account"]').click()
    cy.contains(/account created!/i).should('be.visible')
    cy.get('a[data-qa="continue-button"]').click()
    cy.contains(userName).should('be.visible')
    cy.get('.shop-menu a[href="/view_cart"]').click()
    cy.get('.btn.btn-default.check_out').contains('Proceed To Checkout').click()

    cy.contains(/Your delivery address/i).should('be.visible')
    cy.contains(/Your billing address/i).should('be.visible')
    cy.get('#address_delivery .address_firstname.address_lastname').invoke('text')
      .should('equal', `${gender}. ${first_name} ${last_name}`)
    cy.get('#address_delivery .address_address1.address_address2').eq(0)
      .should('have.text', company)
    cy.get('#address_delivery .address_address1.address_address2').eq(1)
      .should('have.text', address)
    cy.get('#address_delivery .address_address1.address_address2').eq(2)
      .should('have.text', address2)
    cy.then(() => {
      cy.get('.cart_description a').should('have.text', goodName)
    })
    cy.then(() => {
      cy.get('.cart_price p').should('have.text', price1psc)
    })
    
    cy.get('textarea[class="form-control"]').type('...some comment to order...')
    cy.get('a[href="/payment"]').click()
    cy.get('input[data-qa="name-on-card"]').type(`${first_name} ${last_name}`)
    cy.get('input[data-qa="card-number"]').type('1234567890123456')
    cy.get('input[data-qa="cvc"]').type('111')
    cy.get('input[data-qa="expiry-month"]').type('12')
    cy.get('input[data-qa="expiry-year"]').type('2025')
    cy.get('button[data-qa="pay-button"]').click()
    // cy.get('.form-row .alert-success').contains(/Your order has been placed successfully!/i)
    // cy.contains(/Your order has been placed successfully!/i).should('be.visible')
    // cy.get('#success_message > .alert-success').should('include.text', 'Your order has been placed successfully!')
    cy.get('h2[data-qa="order-placed"]').should('have.text', 'Order Placed!')  
    cy.get('a[href="/delete_account"]').click()
    cy.contains(/account deleted!/i).should('be.visible')
  })

  it('Test Case 15: Place Order: Register before Checkout', () => {
    let price1psc, price1pscNum, goodName
    cy.get('.overlay-content h2').eq(2).invoke('text')
      .then((text) => {
        price1psc = text.trim()
        price1pscNum = text.slice(4)
    })
    cy.get('.overlay-content p').eq(2).invoke('text')
      .then((text) => {
        goodName = text.trim()
      })
    cy.then(() => {
      cy.log('Price:', price1psc);
      cy.log('Good Name:', goodName);
      cy.log('Price as Number:', price1pscNum);
    })

    cy.get('.shop-menu a[href="/login"]').click()
    cy.contains(/New User Signup!/i).should('be.visible')
    cy.get(".signup-form").should('contain', 'New User Signup!')
    cy.get('input[data-qa="signup-name"]').type(userName)
    cy.get('input[data-qa="signup-email"]').type(userEmailDelete)
    cy.get('button[data-qa="signup-button"]').click()
    // Checking for an already registered user and error message "Email Address already exist!"
    cy.get('body').then(($body) => {
      if ($body.find('p[style="color: red;"]').length) {
        cy.get('input[data-qa="login-email"]').type(userEmailDelete)
        cy.get('input[data-qa="login-password"]').type(userPassword)
        cy.get('button[data-qa="login-button"]').click()
        cy.get('a[href="/delete_account"]').click()
        cy.get('a[href="/login"]').click()
        cy.get('input[data-qa="signup-name"]').type(userName)
        cy.get('input[data-qa="signup-email"]').type(userEmailDelete)
        cy.get('button[data-qa="signup-button"]').click()
      }
    })
    cy.contains(/Enter Account Information/i).should('be.visible')
    cy.get('#id_gender1').click()
    cy.get('input[data-qa="password"]').type(userPassword)
    cy.get('select[data-qa="days"]').select(1)
    cy.get('select[data-qa="months"]').select(1)
    cy.get('select[data-qa="years"]').select('1999')
    cy.get('#newsletter').check()
    cy.get('#optin').check()
    cy.get('input[data-qa="first_name"]').type('Anton')
    cy.get('input[data-qa="last_name"]').type('K')
    cy.get('input[data-qa="company"]').type('test_company_name')
    cy.get('input[data-qa="address"]').type('Yavornitskogo str., build 100,')
    cy.get('input[data-qa="address2"]').type('US, FL')
    cy.get('select[data-qa="country"]').select('United States')
    cy.get('input[data-qa="state"]').type('FL')
    cy.get('input[data-qa="city"]').type('Miami')
    cy.get('input[data-qa="zipcode"]').type('33101')
    cy.get('input[data-qa="mobile_number"]').type('1-703-555-567')
    cy.get('button[data-qa="create-account"]').click()
    cy.contains(/account created!/i).should('be.visible')
    cy.get('a[data-qa="continue-button"]').click()
    cy.contains(userName).should('be.visible')
    cy.get('a[data-product-id]').eq(5).click({force:true})
    cy.get('.modal-body a[href="/view_cart"]').click()
    cy.get('.cart_product').should('have.length', 1)
    cy.url().should('include', '/view_cart')
    cy.title().should('equal', 'Automation Exercise - Checkout')
    cy.get('#do_action a').contains('Proceed To Checkout').click()

    cy.contains(/Your delivery address/i).should('be.visible')
    cy.contains(/Your billing address/i).should('be.visible')
    cy.get('#address_delivery .address_firstname.address_lastname').invoke('text')
      .should('equal', `${gender}. ${first_name} ${last_name}`)
    cy.get('#address_delivery .address_address1.address_address2').eq(0)
      .should('have.text', company)
    cy.get('#address_delivery .address_address1.address_address2').eq(1)
      .should('have.text', address)
    cy.get('#address_delivery .address_address1.address_address2').eq(2)
      .should('have.text', address2)
    cy.then(() => {
      cy.get('.cart_description a').should('have.text', goodName)
    })
    cy.then(() => {
      cy.get('.cart_price p').should('have.text', price1psc)
    })
    cy.get('textarea[class="form-control"]').type('...some comment to order...')
    cy.get('a[href="/payment"]').click()
    cy.get('input[data-qa="name-on-card"]').type(`${first_name} ${last_name}`)
    cy.get('input[data-qa="card-number"]').type('1234567890123456')
    cy.get('input[data-qa="cvc"]').type('111')
    cy.get('input[data-qa="expiry-month"]').type('12')
    cy.get('input[data-qa="expiry-year"]').type('2025')
    cy.get('button[data-qa="pay-button"]').click()
    cy.get('h2[data-qa="order-placed"]').should('have.text', 'Order Placed!')  
    cy.get('a[href="/delete_account"]').click()
    cy.contains(/account deleted!/i).should('be.visible')
  })

  it('Test Case 16: Place Order: Login before Checkout', () => {
    let price1psc, price1pscNum, goodName
    cy.get('.overlay-content h2').eq(7).invoke('text')
      .then((text) => {
        price1psc = text.trim()
        price1pscNum = text.slice(4)
    })
    cy.get('.overlay-content p').eq(7).invoke('text')
      .then((text) => {
        goodName = text.trim()
      })
    cy.then(() => {
      cy.log('Price:', price1psc);
      cy.log('Good Name:', goodName);
      cy.log('Price as Number:', price1pscNum);
    })
    cy.get('a[href="/login"]').click()
    cy.contains(/Login to your account/i).should('be.visible')
    cy.get('input[data-qa="login-email"]').type(userEmail)
    cy.get('input[data-qa="login-password"]').type(userPassword)
    cy.get('button[data-qa="login-button"]').click()
    cy.contains(userName).should('be.visible')

    cy.get('a[data-product-id]').eq(15).click({force:true})
    cy.get('.modal-body a[href="/view_cart"]').click()
    cy.get('.cart_product').should('have.length', 1)
    cy.url().should('include', '/view_cart')
    cy.title().should('equal', 'Automation Exercise - Checkout')
    cy.get('#do_action a').contains('Proceed To Checkout').click()

    cy.contains(/Your delivery address/i).should('be.visible')
    cy.contains(/Your billing address/i).should('be.visible')
    cy.get('#address_delivery .address_firstname.address_lastname').invoke('text')
      .should('equal', `${gender}. ${first_name} ${last_name}`)
    cy.get('#address_delivery .address_address1.address_address2').eq(0)
      .should('have.text', company)
    cy.get('#address_delivery .address_address1.address_address2').eq(1)
      .should('have.text', address)
    cy.get('#address_delivery .address_address1.address_address2').eq(2)
      .should('have.text', address2)
    cy.then(() => {
      cy.get('.cart_description a').should('have.text', goodName)
    })
    cy.then(() => {
      cy.get('.cart_price p').should('have.text', price1psc)
    })
    cy.get('textarea[class="form-control"]').type('...some comment to order...')
    cy.get('a[href="/payment"]').contains('Place Order').click()
    cy.get('input[data-qa="name-on-card"]').type(`${first_name} ${last_name}`)
    cy.get('input[data-qa="card-number"]').type('1234567890123456')
    cy.get('input[data-qa="cvc"]').type('111')
    cy.get('input[data-qa="expiry-month"]').type('12')
    cy.get('input[data-qa="expiry-year"]').type('2025')
    cy.get('button[data-qa="pay-button"]').click()
    // cy.contains('Your order has been placed successfully!')
    // cy.get('div#success_message').contains('Your order has been placed successfully!').should('be.visible')
    cy.get('h2[data-qa="order-placed"]').should('have.text', 'Order Placed!')  
    cy.get('a[href="/delete_account"]').click()
    cy.contains(/account deleted!/i).should('be.visible')
  })


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


  it('Test Case 21: Add review on product', () => {
    cy.get('a[href="/products"]').click()
    cy.get('.features_items').children().first().should('have.text', 'All Products')
    cy.url().should('include', '/products')
    cy.get('.choose a').eq(5).contains('View Product').click()
    cy.get('li.active').invoke('text').should('match', /Write Your Review/i)
    cy.get('input#name').type(first_name)
    cy.get('input#email').type(userEmail)
    cy.get('textarea#review').type('...some review text...')
    cy.get('#button-review').click()
    cy.get('div#review-section').contains('Thank you for your review.')
      .should('be.visible')
  })

  it('Test Case 22: Add to cart from Recommended items', () => {
    let goodName
    cy.scrollTo('bottom')
    cy.get('.recommended_items').contains('recommended items')
      .should('be.visible')
    cy.get('div.item.active').last().find('p').eq(1)
      .invoke('text').then((text) => {
      goodName = text.trim()
    })
    cy.get('div.item.active').last().find('a.add-to-cart').eq(1).click()
    cy.get('.modal-body').find('a[href="/view_cart"]').click()
    cy.then(() => {
      cy.get('.cart_description a').should('have.text', goodName)
    })
  })

  it('Test Case 23: Verify address details in checkout page', () => {
    cy.get('a[href="/login"]').click()
    cy.contains(/New User Signup!/i).should('be.visible')
    cy.get(".signup-form").should('contain', 'New User Signup!')
    cy.get('input[data-qa="signup-name"]').type(userName)
    cy.get('input[data-qa="signup-email"]').type(userEmailDelete)
    cy.get('button[data-qa="signup-button"]').click()
    // Checking for an already registered user and error message "Email Address already exist!"
    cy.get('body').then(($body) => {
      if ($body.find('p[style="color: red;"]').length) {
        cy.get('input[data-qa="login-email"]').type(userEmailDelete)
        cy.get('input[data-qa="login-password"]').type(userPassword)
        cy.get('button[data-qa="login-button"]').click()
        cy.get('a[href="/delete_account"]').click()
        cy.get('a[href="/login"]').click()
        cy.get('input[data-qa="signup-name"]').type(userName)
        cy.get('input[data-qa="signup-email"]').type(userEmailDelete)
        cy.get('button[data-qa="signup-button"]').click()
      }
    })
    cy.contains(/Enter Account Information/i).should('be.visible')
    cy.get('#id_gender1').click()
    cy.get('input[data-qa="password"]').type(userPassword)
    cy.get('select[data-qa="days"]').select(1)
    cy.get('select[data-qa="months"]').select(1)
    cy.get('select[data-qa="years"]').select('1999')
    cy.get('#newsletter').check()
    cy.get('#optin').check()
    cy.get('input[data-qa="first_name"]').type('Anton')
    cy.get('input[data-qa="last_name"]').type('K')
    cy.get('input[data-qa="company"]').type('test_company_name')
    cy.get('input[data-qa="address"]').type('Yavornitskogo str., build 100,')
    cy.get('input[data-qa="address2"]').type('US, FL')
    cy.get('select[data-qa="country"]').select('United States')
    cy.get('input[data-qa="state"]').type('FL')
    cy.get('input[data-qa="city"]').type('Miami')
    cy.get('input[data-qa="zipcode"]').type('33101')
    cy.get('input[data-qa="mobile_number"]').type('1-703-555-567')
    cy.get('button[data-qa="create-account"]').click()
    cy.contains(/account created!/i).should('be.visible')
    cy.get('a[data-qa="continue-button"]').click()
    cy.contains(userName).should('be.visible')

    cy.get('a[data-product-id]').eq(1).click({force:true})
    cy.get('.modal-body a[href="/view_cart"]').click()
    // cy.get('.shop-menu a[href="/view_cart"]').click()
    cy.get('.cart_product').should('have.length', 1)
    cy.url().should('include', '/view_cart')
    cy.title().should('equal', 'Automation Exercise - Checkout')
    cy.get('.btn.btn-default.check_out').contains('Proceed To Checkout').click()

    cy.contains(/Your delivery address/i).should('be.visible')
    cy.contains(/Your billing address/i).should('be.visible')
    cy.get('#address_delivery h3').should('have.text', 'Your delivery address')
    cy.get('#address_invoice h3').should('have.text', 'Your billing address')
    cy.get('#address_delivery .address_firstname.address_lastname')
      .invoke('text')
      .should('equal', `${gender}. ${first_name} ${last_name}`)
    cy.get('#address_delivery .address_address1.address_address2').eq(0)
      .should('have.text', company)
    cy.get('#address_delivery .address_address1.address_address2').eq(1)
      .should('have.text', address)
    cy.get('#address_delivery .address_address1.address_address2').eq(2)
      .should('have.text', address2)
    cy.get('#address_invoice .address_firstname.address_lastname')
      .invoke('text')
      .should('equal', `${gender}. ${first_name} ${last_name}`)
    cy.get('#address_invoice .address_address1.address_address2').eq(0)
      .should('have.text', company)
    cy.get('#address_invoice .address_address1.address_address2').eq(1)
      .should('have.text', address)
    cy.get('#address_invoice .address_address1.address_address2').eq(2)
      .should('have.text', address2)

    cy.get('a[href="/delete_account"]').click()
    cy.contains(/account deleted!/i).should('be.visible')
  })

  it('Test Case 24: Download Invoice after purchase order', () => {
    let price1psc, price1pscNum, goodName
    cy.get('.overlay-content h2').eq(0).invoke('text')
      .then((text) => {
        price1psc = text.trim()
        price1pscNum = text.slice(4)
    })
    cy.get('.overlay-content p').eq(0).invoke('text')
      .then((text) => {
        goodName = text.trim()
      })
    cy.then(() => {
      cy.log('Price:', price1psc);
      cy.log('Good Name:', goodName);
      cy.log('Price as Number:', price1pscNum);
    })
    cy.get('a[data-product-id]').eq(1).click({force:true})
    cy.get('.modal-body a[href="/view_cart"]').click()
    // cy.get('.shop-menu a[href="/view_cart"]').click()
    cy.get('.cart_product').should('have.length', 1)
    cy.url().should('include', '/view_cart')
    cy.title().should('equal', 'Automation Exercise - Checkout')
    cy.get('.btn.btn-default.check_out').contains('Proceed To Checkout').click()
    cy.get('.modal-body a[href="/login"]').click()

    cy.contains(/New User Signup!/i).should('be.visible')
    cy.get(".signup-form").should('contain', 'New User Signup!')
    cy.get('input[data-qa="signup-name"]').type(userName)
    cy.get('input[data-qa="signup-email"]').type(userEmailDelete)
    cy.get('button[data-qa="signup-button"]').click()
    // Checking for an already registered user and error message "Email Address already exist!"
    cy.get('body').then(($body) => {
      if ($body.find('p[style="color: red;"]').length) {
        cy.get('input[data-qa="login-email"]').type(userEmailDelete)
        cy.get('input[data-qa="login-password"]').type(userPassword)
        cy.get('button[data-qa="login-button"]').click()
        cy.get('a[href="/delete_account"]').click()
        cy.get('a[href="/login"]').click()
        cy.get('input[data-qa="signup-name"]').type(userName)
        cy.get('input[data-qa="signup-email"]').type(userEmailDelete)
        cy.get('button[data-qa="signup-button"]').click()
      }
    })
    cy.contains(/Enter Account Information/i).should('be.visible')
    cy.get('#id_gender1').click()
    cy.get('input[data-qa="password"]').type(userPassword)
    cy.get('select[data-qa="days"]').select(1)
    cy.get('select[data-qa="months"]').select(1)
    cy.get('select[data-qa="years"]').select('1999')
    cy.get('#newsletter').check()
    cy.get('#optin').check()
    cy.get('input[data-qa="first_name"]').type('Anton')
    cy.get('input[data-qa="last_name"]').type('K')
    cy.get('input[data-qa="company"]').type('test_company_name')
    cy.get('input[data-qa="address"]').type('Yavornitskogo str., build 100,')
    cy.get('input[data-qa="address2"]').type('US, FL')
    cy.get('select[data-qa="country"]').select('United States')
    cy.get('input[data-qa="state"]').type('FL')
    cy.get('input[data-qa="city"]').type('Miami')
    cy.get('input[data-qa="zipcode"]').type('33101')
    cy.get('input[data-qa="mobile_number"]').type('1-703-555-567')
    cy.get('button[data-qa="create-account"]').click()
    cy.contains(/account created!/i).should('be.visible')
    cy.get('a[data-qa="continue-button"]').click()
    cy.contains(userName).should('be.visible')
    cy.contains('li', 'Logged in as').find('b').should('have.text', userName)
    cy.get('.shop-menu a[href="/view_cart"]').click()
    //or altenative = cy.get('.shop-menu').contains('a', 'Cart').click()
    cy.get('a.btn.btn-default.check_out').click()
    //or altenative = cy.contains('.btn', 'Proceed To Checkout').click()
    
    cy.contains(/Your delivery address/i).should('be.visible')
    cy.contains(/Your billing address/i).should('be.visible')
    cy.get('[data-qa="checkout-info"] #address_delivery h3').should('have.text', 'Your delivery address')
    cy.get('[data-qa="checkout-info"] #address_invoice h3').should('have.text', 'Your billing address')
    cy.get('#address_delivery .address_firstname.address_lastname')
      .invoke('text')
      .should('equal', `${gender}. ${first_name} ${last_name}`)
    cy.get('[data-qa="checkout-info"] #address_delivery .address_address1.address_address2').eq(0)
      .should('have.text', company)
    cy.get('[data-qa="checkout-info"] #address_delivery .address_address1.address_address2').eq(1)
      .should('have.text', address)
    cy.get('[data-qa="checkout-info"] #address_delivery .address_address1.address_address2').eq(2)
      .should('have.text', address2)
    cy.get('[data-qa="checkout-info"] #address_invoice .address_firstname.address_lastname')
      .invoke('text')
      .should('equal', `${gender}. ${first_name} ${last_name}`)
    cy.get('[data-qa="checkout-info"] #address_invoice .address_address1.address_address2').eq(0)
      .should('have.text', company)
    cy.get('[data-qa="checkout-info"] #address_invoice .address_address1.address_address2').eq(1)
      .should('have.text', address)
    cy.get('[data-qa="checkout-info"] #address_invoice .address_address1.address_address2').eq(2)
      .should('have.text', address2)
    
    cy.then(() => {
      cy.get('.cart_description h4 a').should('have.text', goodName)
    })
    cy.then(() => {
      cy.get('.cart_price p').should('have.text', price1psc)
    })

    cy.get('textarea[class="form-control"]').type('...some comment to order...')
    cy.get('a[href="/payment"]').click()
    cy.get('input[data-qa="name-on-card"]').type(`${first_name} ${last_name}`)
    cy.get('input[data-qa="card-number"]').type('1234567890123456')
    cy.get('input[data-qa="cvc"]').type('111')
    cy.get('input[data-qa="expiry-month"]').type('12')
    cy.get('input[data-qa="expiry-year"]').type('2025')
    cy.get('button[data-qa="pay-button"]').click()
    // cy.get('.form-row .alert-success').contains(/Your order has been placed successfully!/i)
    // cy.contains(/Your order has been placed successfully!/i).should('be.visible')
    // cy.get('#success_message > .alert-success').should('include.text', 'Your order has been placed successfully!')
    cy.get('h2[data-qa="order-placed"]').should('have.text', 'Order Placed!')  
    cy.intercept('GET', '/download_invoice/*').as('downloadInvoice')
    cy.contains('.btn', 'Download Invoice').click()
    //or altenative = cy.get('.btn.btn-default.check_out').click()
    cy.wait('@downloadInvoice').its('response.statusCode').should('eq', 200)
    cy.get('a[data-qa="continue-button"]').click()

    cy.get('a[href="/delete_account"]').click()
    cy.contains(/account deleted!/i).should('be.visible')
  })
  
  it('Test Case 25: Verify Scroll Up using "Arrow" button and Scroll Down functionality', () => {
    cy.scrollTo('bottom')
    cy.get('.single-widget h2').contains('Subscription').should('be.visible')
    cy.get('.single-widget h2')
      .should(($el) => {
        const rect = $el[0].getBoundingClientRect(); // Отримуємо розмір і позицію елемента
        try {
          expect(rect.top).to.be.greaterThan(0); // Перевіряємо, що елемент знаходиться в межах видимої частини
          expect(rect.bottom).to.be.lessThan(Cypress.config('viewportHeight')); // Перевіряємо, що елемент не вийшов за межі екрану
        } catch (error) {
          Cypress.log({
            name: 'Visibility check',
            message: 'Subscription section is not visible within the viewport',
            consoleProps: () => {
                return {
                    rect,
                    errorMessage: error.message,
                };
            },
          });
          throw error;
        }
      })
    cy.get('#scrollUp').click()
    cy.get('div.carousel-inner div.item.active').eq(0)
      .contains('Full-Fledged practice website for Automation Engineers')
      .should('be.visible')
    cy.get('div.carousel-inner div.item.active').eq(0) 
      .should(($el) => {
        const rect = $el[0].getBoundingClientRect(); // Отримуємо розмір і позицію елемента
        expect(rect.top).to.be.greaterThan(0); // Перевіряємо, що елемент знаходиться в межах видимої частини
        expect(rect.bottom).to.be.lessThan(Cypress.config('viewportHeight')); // Перевіряємо, що елемент не вийшов за межі екрану
      })
  })

  it('Test Case 26: Verify Scroll Up without "Arrow" button and Scroll Down functionality', () => {
    cy.scrollTo('bottom')
    cy.get('.single-widget h2').contains('Subscription').should('be.visible')
    cy.get('.single-widget h2')
      .should(($el) => {
        const rect = $el[0].getBoundingClientRect(); // Отримуємо розмір і позицію елемента
        expect(rect.top).to.be.greaterThan(0); // Перевіряємо, що елемент знаходиться в межах видимої частини
        expect(rect.bottom).to.be.lessThan(Cypress.config('viewportHeight')); // Перевіряємо, що елемент не вийшов за межі екрану
      })
      cy.scrollTo('top')
    cy.get('div.carousel-inner div.item.active').eq(0)
      .contains('Full-Fledged practice website for Automation Engineers')
      .should('be.visible')
    cy.get('div.carousel-inner div.item.active').eq(0) 
      .should(($el) => {
        const rect = $el[0].getBoundingClientRect(); // Отримуємо розмір і позицію елемента
        expect(rect.top).to.be.greaterThan(0); // Перевіряємо, що елемент знаходиться в межах видимої частини
        expect(rect.bottom).to.be.lessThan(Cypress.config('viewportHeight')); // Перевіряємо, що елемент не вийшов за межі екрану
      })
  })
})