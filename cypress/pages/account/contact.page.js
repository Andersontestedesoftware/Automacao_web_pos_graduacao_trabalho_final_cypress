// Page Object para o formulário de contato
class Contact {
  // Abre a página de contato clicando no link que contém 'contact'
  openContact() {
    cy.get('a[href*=contact]').click();
  }

  // Preenche o formulário de contato e envia o arquivo de fixture como upload
  fillContact({ name, email, subject, message, fixture = 'example.json' }) {
    // Preenche campo nome
    cy.get('[data-qa="name"]').clear().type(name);
    // Preenche campo email
    cy.get('[data-qa="email"]').clear().type(email);
    // Preenche campo assunto
    cy.get('[data-qa="subject"]').clear().type(subject);
    // Preenche campo mensagem
    cy.get('[data-qa="message"]').clear().type(message);
    // Carrega fixture e associa a um alias para uso no selectFile
    cy.fixture(fixture).as('arquivo');
    // Usa selectFile com alias para simular upload de arquivo
    cy.get('input[type=file]').selectFile('@arquivo');
    // Clica em submit
    cy.get('[data-qa="submit-button"]').click();
  }

  // Verifica mensagem de sucesso após envio
  verifySuccess() {
    cy.get('.status').should('be.visible').and('have.text', 'Success! Your details have been submitted successfully.');
  }
}

export default new Contact();
