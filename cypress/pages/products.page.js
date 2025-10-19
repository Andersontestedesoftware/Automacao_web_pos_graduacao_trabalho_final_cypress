// Page Object para ações relacionadas a listagem de produtos, modal de produto e carrinho
class Products {
  // Navega até a página de produtos clicando no link apropriado
  goToProducts() {
    cy.get('a[href="/products"]').should('be.visible').click();
  }

  // Abre a página de detalhes de um produto pela posição (index) na lista
  openProductByIndex(index = 3) {
    cy.get(`:nth-child(${index}) > .product-image-wrapper > .choose > .nav > li > a`).click();
  }

  // Adiciona um produto ao carrinho a partir da seção de 'features'
  addProductToCartFromFeatures(index = 3) {
    cy.get(`.features_items > :nth-child(${index}) > .product-image-wrapper > .single-products > .productinfo > .btn`).click();
  }

  // Verifica se o modal exibido após adicionar ao carrinho contém determinado texto
  verifyModalContains(text) {
    cy.get('.modal-body > :nth-child(1)').should('contain', text);
  }

  // Clica no botão de continuar/fechar presente no modal
  continueFromModal() {
    cy.get('.modal-body > :nth-child(2)').click();
  }

  // Vai para a página de carrinho e procede para checkout
  viewCartAndProceed() {
    cy.get('.col-sm-6 > .btn').click();
  }

  // Verifica se o carrinho contém um produto com o nome esperado
  verifyCartHasProduct(name) {
    cy.get('.cart_description > h4').should('be.visible').and('contain.text', name);
  }

  // Pesquisa produto pelo nome usando o campo de busca
  searchProduct(name) {
    cy.get('[name="search"]').clear().type(name);
    cy.get('#submit_search').click();
  }

  // Verificações robustas para a área de informações do produto
  verifyProductInfo() {
    cy.get('.product-information').within(() => {
      // Nome do produto
      cy.get('h2').should('be.visible');
      // Preço e botão Add to cart
      cy.contains('Rs.').should('exist');
      cy.contains('Add to cart').should('exist');
      // Quantidade (input name=quantity) deve iniciar com 1
      cy.get('[name="quantity"]').should('have.value', '1');
      // Labels de disponibilidade/condição/marca
      cy.contains('Availability').should('exist');
      cy.contains('Condition').should('exist');
      cy.contains('Brand').should('exist');
    });
  }
}

// Exporta as funções do page object
export default new Products();
