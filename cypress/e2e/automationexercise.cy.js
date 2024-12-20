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
  beforeEach( () => {
    cy.visit('/')
    cy.get(".fa-home").should('have.css', 'color', 'rgb(255, 165, 0)')
    cy.get("section[id='slider']").should('exist')
    cy.contains(/Brands/i).should('be.visible')
    cy.get('a[href="/login"]').as('loginButton')
  })

  it('Test Case 1: Register User', () => {
    cy.get('@loginButton').click()
    cy.contains(/New User Signup!/i).should('be.visible')
    // cy.get(".signup-form").should('contain', 'New User Signup!')
    cy.get('input[data-qa="signup-name"]').type(userName)
    cy.get('input[data-qa="signup-email"]').type(userEmail)
    cy.get('button[data-qa="signup-button"]').click()
    // Checking for an already registered user and error message "Email Address already exist!"
    cy.get('body').then(($body) => {
      if ($body.find('p[style="color: red;"]').length) {
        cy.get('input[data-qa="login-email"]').type(userEmailDelete)
        cy.get('input[data-qa="login-password"]').type(userPassword)
        cy.get('button[data-qa="login-button"]').click()
        cy.get('a[href="/delete_account"]').click()
        cy.get('@loginButton').click()
        cy.get('input[data-qa="signup-name"]').type(userName)
        cy.get('input[data-qa="signup-email"]').type(userEmailDelete)
        cy.get('button[data-qa="signup-button"]').click()
      }
    })
    cy.contains(/Enter Account Information/i).should('be.visible')
    cy.get(`input[value="${gender}"]`).click()
    cy.get('input[data-qa="password"]').type(userPassword)
    cy.get('select[data-qa="days"]').select(1)
    cy.get('select[data-qa="months"]').select(birth_month)
    cy.get('select[data-qa="years"]').select(birth_year)
    cy.get('#newsletter').check()
    cy.get('#optin').check()
    cy.get('input[data-qa="first_name"]').type(first_name)
    cy.get('input[data-qa="last_name"]').type(last_name)
    cy.get('input[data-qa="company"]').type(company)
    cy.get('input[data-qa="address"]').type(address)
    cy.get('input[data-qa="address2"]').type(address2)
    cy.get('select[data-qa="country"]').select(country)
    cy.get('input[data-qa="state"]').type(state)
    cy.get('input[data-qa="city"]').type(city)
    cy.get('input[data-qa="zipcode"]').type(zipcode)
    cy.get('input[data-qa="mobile_number"]').type(mobile_number)
    cy.get('button[data-qa="create-account"]').click()
    cy.contains(/account created!/i).should('be.visible')
    cy.get('a[data-qa="continue-button"]').click()
    cy.contains(userName).should('be.visible')
    // cy.get('a[href="/delete_account"]').click()
    // cy.contains(/account deleted!/i).should('be.visible')
  })

  it('Test Case 2: Login User with correct email and password', () => {
    cy.get('@loginButton').click()
    cy.contains(/Login to your account/i).should('be.visible')
    cy.get('input[data-qa="login-email"]').type(userEmail)
    cy.get('input[data-qa="login-password"]').type(userPassword)
    cy.get('button[data-qa="login-button"]').click()
    cy.contains(userName).should('be.visible')
  })

  it('Test Case 3: Login User with incorrect email and password', () => {
    cy.get('@loginButton').click()
    cy.contains(/Login to your account/i).should('be.visible')
    cy.get('input[data-qa="login-email"]').type(userEmail+'1')
    cy.get('input[data-qa="login-password"]').type(userPassword+'1')
    cy.get('button[data-qa="login-button"]').click()
    cy.contains(/Your email or password is incorrect!/i).should('be.visible')
    cy.get('form[action="/login"]>p')
      .should('have.text', 'Your email or password is incorrect!')
  })

  it('Test Case 4: Logout User', () => {
    cy.get('@loginButton').click()
    cy.contains(/Login to your account/i).should('be.visible')
    cy.get('input[data-qa="login-email"]').type(userEmail)
    cy.get('input[data-qa="login-password"]').type(userPassword)
    cy.get('button[data-qa="login-button"]').click()
    cy.contains(userName).should('be.visible')
    cy.get('a[href="/logout"]').click()
    cy.contains(/Login to your account/i).should('be.visible')
  })

  it('Test Case 5: Register User with existing email', () => {
    cy.get('@loginButton').click()
    cy.contains(/New User Signup!/i).should('be.visible')
    cy.get('input[data-qa="signup-name"]').type(userName)
    cy.get('input[data-qa="signup-email"]').type(userEmail)
    cy.get('button[data-qa="signup-button"]').click()
    cy.contains(/Email Address already exist!/i).should('be.visible')
    cy.get('form[action="/signup"]>p')
      .should('have.text', 'Email Address already exist!')
  })

  it('Test Case 6: Contact Us Form', () => {
    cy.get('a[href="/contact_us"]').click()
    cy.contains(/Get In Touch/i).should('be.visible')
    cy.get('h2[class="title text-center"]').eq(1)
      .should('have.text', 'Get In Touch')
    cy.contains('h2.title.text-center', 'Get In Touch')
    cy.get('input[data-qa="name"]').type('test Name')
    cy.get('input[data-qa="email"]').type('test@email.com')
    cy.get('input[data-qa="subject"]').type('Subject text for test')
    cy.get('textarea[data-qa="message"]').type('Message text for test')
    cy.get('input[type="file"]').attachFile('/example.json')
    cy.on('window:alert', () => {})
    cy.get('input[data-qa="submit-button"]').click()
    cy.contains(/Success! Your details have been submitted successfully./i).should('be.visible')
    cy.get('.status.alert.alert-success')
      .should('have.text', 'Success! Your details have been submitted successfully.')
    cy.get('.btn.btn-success').click()
  })  

  it('Test Case 7: Verify Test Cases Page', () => {
  cy.get('a[href="/test_cases"]').contains(' Test Cases').click()
  cy.get('a[href="/test_cases"]').contains(/\s*Test Cases\s*/).click()
  cy.get('h2.title').should('have.text', 'Test Cases')
  })

  it('Test Case 8: Verify All Products and product detail page', () => {
    cy.get('.shop-menu a[href="/products"]').contains(/\s*Products\s*/).click()
    cy.get('h2.title').should('have.text', 'All Products')
    cy.get('.product-overlay').should('have.length.above', 0)
    cy.get('.choose').eq(0).contains('View Product').click()
    cy.get('.product-information').should('be.visible')
  })

  it('Test Case 9: Search Product', () => {
    cy.get('.shop-menu a[href="/products"]').contains(/\s*Products\s*/).click()
    cy.get('h2.title').should('have.text', 'All Products')
    cy.get('input#search_product').type('saree')
    cy.get('button#submit_search').click()
    cy.get('h2.title').should('have.text', 'Searched Products')
    cy.get('.overlay-content p').each(($el) => {
      cy.wrap($el).invoke('text').should('match', /Saree/i);
    })
  })

  it('Test Case 10: Verify Subscription in home page', () => {
    cy.scrollTo('bottom')
    cy.get('.single-widget').should('include.text', 'Subscription')
    cy.get('#susbscribe_email').type('test@email.com')
    cy.get('button#subscribe').click()
    cy.contains('You have been successfully subscribed!').should('be.visible')
  })

  it('Test Case 11: Verify Subscription in Cart page', () => {
    cy.get('.shop-menu a[href="/view_cart"]').click()
    cy.window().then((win) => {
      if (win.document.body.scrollHeight > win.innerHeight) {
        cy.scrollTo('bottom')
      }
    })
    cy.get('.single-widget').should('include.text', 'Subscription')
    cy.get('#susbscribe_email').type('test@email.com')
    cy.get('button#subscribe').click()
    cy.contains('You have been successfully subscribed!').should('be.visible')
  })

  it('Test Case 12: Add Products in Cart', () => {
    let qtyCartTrimed, totalPriceSliced
    let price1psc, price1pscNum, goodName
    cy.get('.shop-menu a[href="/products"]').contains(/\s*Products\s*/).click()
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
    cy.get('.single-products').eq(0).scrollIntoView()
      .realHover().find('.product-overlay a.btn')
      .click({ animationDistanceThreshold: 40 })
    cy.get('.btn-success').contains('Continue Shopping').click()
    cy.get('.single-products').eq(1).scrollIntoView()
      .realHover().find('.product-overlay a.btn')
      .click({ animationDistanceThreshold: 40 })
    cy.get('.modal-body a[href="/view_cart"]').click()
    cy.get('.cart_product').should('have.length', 2)
    cy.get('.disabled').first().should('have.text', '1')
    cy.get('.disabled').last().should('have.text', '1')
    cy.get('.cart_price').first().invoke('text')
      .then((cartPriceText) => {
        cy.get('.cart_total_price').first().invoke('text')
        .should('equal', cartPriceText.trim());
      })
    cy.get('.cart_price').last().invoke('text')
    .then((cartPriceText) => {
      cy.get('.cart_total_price').last().invoke('text')
      .should('equal', cartPriceText.trim());
    })
    cy.then(() => {
      cy.get('.cart_description a').eq(0).should('have.text', goodName)
    })
    cy.then(() => {
      cy.get('.cart_price p').eq(0).should('have.text', price1psc)
    })
    cy.get('.disabled').first().invoke('text')
      .then((text) => {
        qtyCartTrimed = text.trim()
    })
    cy.get('.cart_total_price').first().invoke('text')
      .then((text) => {
        totalPriceSliced = text.slice(4)
    })
    cy.then(() => {
      expect(totalPriceSliced/qtyCartTrimed).to.equal(parseFloat(price1pscNum))
    })
  })

  it('Test Case 13: Verify Product quantity in Cart', () => {
    cy.get('.choose').eq(0).contains('View Product').click()
    cy.get('.product-information').should('be.visible')
    cy.get('#quantity').clear().type('4')
    cy.get('.btn.btn-default.cart').click()
    cy.get('.modal-body a[href="/view_cart"]').click()
    cy.get('.cart_product').should('have.length', 1)
    cy.get('.disabled').first().should('have.text', '4')
  })

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
        cy.get('@loginButton').click()
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
        cy.get('@loginButton').click()
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

  it('Test Case 17: Remove Products From Cart', () => {
    cy.get('a[data-product-id]').eq(1).click({force:true})
    cy.get('.modal-body a[href="/view_cart"]').click()
    // cy.get('.shop-menu a[href="/view_cart"]').click()
    cy.get('.cart_product').should('have.length', 1)
    cy.url().should('include', '/view_cart')
    cy.title().should('equal', 'Automation Exercise - Checkout')
    cy.get('.cart_quantity_delete').click()
    cy.get('#empty_cart').contains('Cart is empty!').should('be.visible')
  })


  it('Test Case 18: View Category Products', () => {
    let categoryHrefWomen, categoryHrefMen
    cy.get('a[href="#Women"]').click()
    cy.get('.panel-body a').eq(0).invoke('attr', 'href').then((hrefValue) => {
      categoryHrefWomen = hrefValue.trim()
      cy.get('.panel-body a').eq(0).click()
      cy.url().should('include', categoryHrefWomen)
    })
    cy.get('a[href="#Men"]').click()
    cy.get('div#Men li a').eq(1).invoke('attr', 'href').then((hrefValue) => {
      categoryHrefMen = hrefValue
      cy.get('div#Men li a').eq(1).click()
      cy.url().should('include', categoryHrefMen)
    })
    cy.get('.features_items h2').should('contain', 'Men')
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

  it('Test Case 20: Search Products and Verify Cart After Login', () => {
    cy.get('a[href="/products"]').click()
    cy.get('.features_items').children().first().should('have.text', 'All Products')
    cy.url().should('include', '/products')
    cy.get('input#search_product').type('Saree')
    cy.get('button#submit_search').click()
    cy.url().should('include', '?search')
    cy.get('h2.title').should('have.text', 'Searched Products')
    cy.get('.product-image-wrapper').should('have.length.above', 0)
    cy.get('.product-image-wrapper')

    cy.get('.overlay-content p').each(($el) => {
      cy.wrap($el).invoke('text').should('match', /Saree/i);
    })
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
    cy.get('@loginButton').click()
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
        cy.get('@loginButton').click()
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
        cy.get('@loginButton').click()
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