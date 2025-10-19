// Página de ações relacionadas à autenticação e cadastro (Page Object)
// Este objeto expõe funções reutilizáveis para os testes interagirem com a UI de login/cadastro.
class Auth {
  // Vai para a página inicial do site
  goToHome() {
    // Abre a URL principal do sistema
    cy.visit('https://automationexercise.com/'); 
  }

  // Abre a página de Login / Signup clicando no link correspondente
  openLogin() {
    // Seleciona o link que aponta para /login e clica
    cy.get('a[href="/login"]').click();
  }

  // Preenche o formulário de cadastro inicial (nome e email) e submete o formulário
  signup(name, email) {
    // Campo de nome para o signup (data-qa) - limpa e digita o valor
    cy.get('[data-qa="signup-name"]').clear().type(name);
    // Campo de email para o signup (data-qa) - limpa e digita o valor
    cy.get('[data-qa="signup-email"]').clear().type(email);
    // Clica no botão 'Signup' (procura por um botão que contenha o texto)
    cy.contains('button', 'Signup').click();
  }

  // Seleciona o título (Mrs / Mr) usando o valor do input radio
  selectTitle(title = 'Mrs') {
    // Usa seletor por input radio com atributo value igual ao título e força o check
    cy.get(`input[type=radio][value=\"${title}\"]`).check({ force: true });
  }

  // Define a senha do usuário (campo password)
  setPassword(password) {
    // Digita a senha sem logar o valor no output do Cypress (log: false)
    cy.get('input#password').type(password, { log: false });
  }

  // Define data de nascimento escolhe dia/mes/ano nos selects
  setDOB(day = '20', month = 'September', year = '1992') {
    // Seleciona o dia no select correspondente
    cy.get('select[data-qa="days"]').select(day);
    // Seleciona o mês
    cy.get('select[data-qa="months"]').select(month);
    // Seleciona o ano
    cy.get('select[data-qa="years"]').select(year);
  }

  // Marca preferências (newsletter e ofertas) se necessário
  setPreferences({ newsletter = true, offers = true } = {}) {
    // Marca a checkbox de newsletter quando solicitado
    if (newsletter) cy.get('input[type=checkbox]#newsletter').check();
    // Marca a checkbox de ofertas/optin quando solicitado
    if (offers) cy.get('input[type=checkbox]#optin').check();
  }

  // Preenche os campos de endereço e informações pessoais adicionais
  fillAddress({ firstName, lastName, company, address, country = 'Canada', state, city, zipcode, mobile }) {
    // Preenche nome
    cy.get('input#first_name').clear().type(firstName);
    // Preenche sobrenome
    cy.get('input#last_name').clear().type(lastName);
    // Preenche empresa
    cy.get('input#company').clear().type(company);
    // Preenche endereço
    cy.get('input#address1').clear().type(address);
    // Seleciona país
    cy.get('select#country').select(country);
    // Preenche estado
    cy.get('input#state').clear().type(state);
    // Preenche cidade
    cy.get('input#city').clear().type(city);
    // Preenche CEP
    cy.get('[data-qa="zipcode"]').clear().type(zipcode);
    // Preenche celular
    cy.get('[data-qa="mobile_number"]').clear().type(mobile);
  }

  // Clica para criar a conta após preencher todos os dados
  createAccount() {
    cy.get('[data-qa="create-account"]').click();
  }

  // Clica no botão de continuar/continue após a criação da conta
  continueAfterCreate() {
    cy.get('[data-qa="continue-button"]').click();
  }

  // Realiza login com email e senha fornecidos
  login(email, password) {
    // Preenche campo de email de login
    cy.get('[data-qa="login-email"]').clear().type(email);
    // Preenche campo de senha de login
    cy.get('[data-qa="login-password"]').clear().type(password);
    // Clica no botão de login
    cy.get('[data-qa="login-button"]').click();
  }

  // Faz logout clicando no link de logout (garante visibilidade antes de clicar)
  logout() {
    cy.get('a[href="/logout"]').should('be.visible').click();
  }
}

// Exporta uma instância da classe para manter compatibilidade com imports existentes
export default new Auth();
