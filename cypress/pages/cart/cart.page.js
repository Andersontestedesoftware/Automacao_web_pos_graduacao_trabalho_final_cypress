// Cart-related actions (moved to cart/)
class Cart {
  viewCartAndProceed() { 
    cy.get('.col-sm-6 > .btn').click(); 
  }
  verifyCartHasProduct(name) { 
    cy.get('.cart_description > h4').should('be.visible').and('contain.text', name); 
  }
}

export default new Cart();
