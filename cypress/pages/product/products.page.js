// Page Object para ações relacionadas a listagem de produtos, modal de produto e carrinho
class Products {
  // Navega até a página de produtos clicando no link apropriado
  goToProducts() {
  // Navega até a página de produtos e espera pelo título da página
  cy.get('a[href="/products"]').should('be.visible').click();
  cy.get('.title', { timeout: 20000 }).should('be.visible');
  }

  // Abre a página de detalhes de um produto pela posição (index) na lista
  openProductByIndex(index = 3) {
  // Seleciona o produto por posição e aguarda a navegação
  cy.get(`.features_items > :nth-child(${index}) > .product-image-wrapper > .choose > .nav > li > a`, { timeout: 10000 })
    .should('be.visible')
    .click();
  // Aguarda que a área de produto esteja visível
  cy.get('.product-information', { timeout: 20000 }).should('be.visible');
  }

  // Adiciona um produto ao carrinho a partir da seção de 'features'
  addProductToCartFromFeatures(index = 3) {
  // Usa o seletor exato para adicionar ao carrinho e aguarda modal
  cy.get(`.features_items > :nth-child(${index}) > .product-image-wrapper > .single-products > .productinfo > .btn`, { timeout: 10000 })
    .should('be.visible')
    .click();
  // Aguarda o modal aparecer
  cy.get('.modal-body', { timeout: 15000 }).should('be.visible');
  }

  // Verifica se o modal exibido após adicionar ao carrinho contém determinado texto
  verifyModalContains(text) {
  // Verifica o texto no modal usando o seletor usado no teste que passa
  cy.get('.modal-body > :nth-child(1)').should('contain', text);
  }

  // Clica no botão de continuar/fechar presente no modal
  continueFromModal() {
  // Alinha com o fluxo do teste original: clica no segundo filho do body do modal
  cy.get('.modal-body > :nth-child(2)').click();
  }

  // Vai para a página de carrinho e procede para checkout
  viewCartAndProceed() {
  // Mantém o seletor do teste que passa
  cy.get('.col-sm-6 > .btn').click();
  }

  // Verifica se o carrinho contém um produto com o nome esperado
  verifyCartHasProduct(name) {
  // Usa o seletor exato que o teste usa e que está funcionando
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
