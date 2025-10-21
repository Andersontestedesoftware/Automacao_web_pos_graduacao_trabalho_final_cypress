// Auth page object (organizado em pasta login)
class Auth {
  goToHome() { 
    cy.visit('https://automationexercise.com/'); 
  }
  openLogin() { 
    cy.get('a[href="/login"]').click(); 
  }
  signup(name, email) { 
    cy.get('[data-qa="signup-name"]')
      .clear()
      .type(name); 
    cy.get('[data-qa="signup-email"]')
      .clear()
      .type(email); 
    cy.contains('button', 'Signup').click(); 
  }
  selectTitle(title = 'Mrs') { 
    cy.get(`input[type=radio][value="${title}"]`)
      .check({ force: true }); 
  }
  setPassword(password) { 
    cy.get('input#password')
      .type(password, { log: false }); 
    }
  setDOB(day = '20', month = 'September', year = '1992') { 
    cy.get('select[data-qa="days"]').select(day); 
    cy.get('select[data-qa="months"]').select(month); 
    cy.get('select[data-qa="years"]').select(year); 
  }
  setPreferences({ newsletter = true, offers = true } = {}) { 
    if (newsletter) 
      cy.get('input[type=checkbox]#newsletter').check(); 
    if (offers) 
      cy.get('input[type=checkbox]#optin').check(); 
  }
  fillAddress({ firstName, lastName, company, address, country = 'Canada', state, city, zipcode, mobile }) { 
    cy.get('input#first_name').clear().type(firstName); 
    cy.get('input#last_name').clear().type(lastName); 
    cy.get('input#company').clear().type(company); 
    cy.get('input#address1').clear().type(address); 
    cy.get('select#country').select(country); 
    cy.get('input#state').clear().type(state); 
    cy.get('input#city').clear().type(city); 
    cy.get('[data-qa="zipcode"]').clear().type(zipcode); 
    cy.get('[data-qa="mobile_number"]').clear().type(mobile); 
  }
  createAccount() { 
    cy.get('[data-qa="create-account"]').click(); 
  }
  continueAfterCreate() { 
    cy.get('[data-qa="continue-button"]').click(); 
  }
  login(email, password) { 
    cy.get('[data-qa="login-email"]').clear().type(email); 
    cy.get('[data-qa="login-password"]').clear().type(password); 
    cy.get('[data-qa="login-button"]').click(); 
  }
  logout() { 
    cy.get('a[href="/logout"]').should('be.visible').click(); 
  }
}

export default new Auth();
