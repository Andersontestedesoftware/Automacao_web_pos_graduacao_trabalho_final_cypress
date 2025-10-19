// Page Object para ações relacionadas a listagem de produtos, modal de produto e carrinho
class Products {
  // Navega até a página de produtos clicando no link apropriado
  goToProducts() {
    cy.get('a[href="/products"]').should('be.visible').click();
  }

  // Abre a página de detalhes de um produto pela posição (index) na lista
  openProductByIndex(index = 3) {
    // Seleciona o N-ésimo produto procurando pelos elementos '.product-image-wrapper'
    cy.get('.features_items')
      .find('.product-image-wrapper')
      .eq(index - 1)
      .find('.choose .nav li a')
      .click();
  }

  // Adiciona um produto ao carrinho a partir da seção de 'features'
  addProductToCartFromFeatures(index = 3) {
    cy.get('.features_items')
      .find('.product-image-wrapper')
      .eq(index - 1)
      .find('.single-products .productinfo .btn')
      .click();
  }

  // Verifica se o modal exibido após adicionar ao carrinho contém determinado texto
  verifyModalContains(text) {
  // Procura dentro do corpo do modal por um elemento que contenha o texto (mais robusto que :nth-child)
  cy.get('.modal-body').contains(text).should('exist');
  }

  // Clica no botão de continuar/fechar presente no modal
  continueFromModal() {
  // Fecha/continua usando o botão com texto 'Continue' ou botão padrão dentro do modal
  cy.get('.modal-body').contains(/(Continue|Continue Shopping|Continue to Checkout)/i).click();
  }

  // Vai para a página de carrinho e procede para checkout
  viewCartAndProceed() {
  // Usa texto do botão para maior estabilidade
  cy.get('.col-sm-6').contains('Proceed To Checkout').click();
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
