//
// Page Object para ações e verificações relacionadas à conta do usuário
class Account {
  // Verifica se o usuário está logado exibindo o nome no cabeçalho
  verifyLoggedIn(fullName) {
    // O ícone de usuário está dentro de um elemento <i> com classe fa-user; pegamos o pai que contém o texto
    cy.get('i.fa-user').parent().should('contain', fullName);
    // Verifica se o link de logout está visível
    cy.get('a[href="/logout"]').should('be.visible');
  }

  // Verificações mais específicas para a exibição "Logged in as ..."
  verifyLoggedInExact(fullName) {
    // Seleciona o décimo item da lista (onde o texto aparece) e verifica o texto exato
    cy.get(':nth-child(10) > a').should('be.visible').and('have.text', ` Logged in as ${fullName}`);
    // Verifica também que existe um <b> com o nome do usuário
    cy.contains('b', fullName);
    // Garante que o texto compósito esteja visível na página
    cy.contains(`Logged in as ${fullName}`).should('be.visible');
  }

  // Exclui a conta clicando no link apropriado e confirma a mensagem de sucesso
  deleteAccount() {
    // Clica no link responsável pela exclusão (a localização exata pode variar conforme a página)
    cy.get(':nth-child(5) > a').click();
    // Verifica se a mensagem de conta excluída está presente
    cy.get('[data-qa="account-deleted"]').should('exist').and('contain.text', 'Account Deleted!');
    // Clica em continuar após exclusão
    cy.get('[data-qa="continue-button"]').click();
  }
}

// Exporta a instância da classe
export default new Account();
