// Page Object para ações e verificações relacionadas à conta do usuário
class Account {
  // Verifica se o usuário está logado exibindo o nome no cabeçalho
  verifyLoggedIn(fullName) {
    // Evita seletor frágil baseado em ícone. Preferimos um texto/elemento que confirme que o usuário está logado.
    // Aguarda até 10s por um link que contenha o texto 'Logged in as <fullName>' (mais robusto)
    cy.contains('a', `Logged in as ${fullName}`, { timeout: 10000 })
      .should('be.visible')
      // também aceita que o texto esteja presente em qualquer lugar da página
      .then(() => {
        cy.contains(`Logged in as ${fullName}`).should('be.visible');
      });
    // Verifica se o link de logout está visível (com timeout)
    cy.get('a[href="/logout"]', { timeout: 10000 }).should('be.visible');
  }

  // Verificações mais específicas para a exibição "Logged in as ..."
  verifyLoggedInExact(fullName) {
    // Seleciona o link que contém o texto 'Logged in as ...' em vez de usar :nth-child
    cy.contains('a', `Logged in as ${fullName}`).should('be.visible').and('have.text', ` Logged in as ${fullName}`);
    // Verifica também que existe um <b> com o nome do usuário
    cy.contains('b', fullName);
    // Garante que o texto compósito esteja visível na página
    cy.contains(`Logged in as ${fullName}`).should('be.visible');
  }

  // Exclui a conta clicando no link apropriado e confirma a mensagem de sucesso
  deleteAccount() {
    // Usa o texto do link (mais estável do que :nth-child)
    cy.contains('a', /Delete Account/i).click();
    // Verifica se a mensagem de conta excluída está presente
    cy.get('[data-qa="account-deleted"]').should('exist').and('contain.text', 'Account Deleted!');
    // Clica em continuar após exclusão
    cy.get('[data-qa="continue-button"]').click();
  }
}

// Exporta a instância da classe
export default new Account();
