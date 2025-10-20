/// <reference types="cypress" />

// Importa dados estáticos de fixtures e faker para gerar dados dinâmicos
import userData from '../fixtures/example.json';
import { faker } from '@faker-js/faker';
// Importa os page objects que encapsulam ações na UI
import auth from '../pages/account/auth.page';
import account from '../pages/account/account.page';
import products from '../pages/product/products.page';
import contact from '../pages/account/contact.page';
import { registerUser } from '../support/utils/registerUser';
import { loginUser } from '../support/utils/loginUser';
import { createTestData } from '../support/utils/generateTestData';

// Suite de testes principal
describe('Automation Exercise', () => {
  // Executado antes de cada it() para preparar o contexto
  beforeEach(() => {
    // Define o tamanho da viewport para simular um dispositivo
    cy.viewport('iphone-xr'); 
    // Navega para a home e abre o formulário de login/signup
    auth.goToHome();
    auth.openLogin(); 
  });

  // Teste 1: registra usuário novo
  it('Test Case 1: Register User', () => {
    const timestamp = new Date().getTime();
    const firstName = faker.person.firstName();
    const lastName = faker.person.firstName(); 
    const email = `qa-tester-${timestamp}@test.com`;

    // Usa o helper registerUser para evitar duplicação de código
    registerUser({ firstName, lastName, email });
  });

  // Teste 2: login com credenciais corretas e validações básicas de UI
  it('Test Case 2: Login User with correct email and password', () => {
    auth.login('qa-tester-1759530219181@test.com', '12345');
    // Verifica elementos relevantes que confirmam que o usuário está logado
    account.verifyLoggedIn('QA Tester');
    account.verifyLoggedInExact('QA Tester');
  });


  // Teste 3: login com senha inválida e valida mensagem de erro
  it('Test Case 3: Login User with incorrect email and password', () => {
    auth.login('qa-tester-1759530219181@test.com', '99754321');
    // Mensagem exibida pelo formulário de login
    cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!');
  });

  // Teste 4: logout e verificação de estado anônimo
  it('Test Case 4: Logout User', () => {
    auth.login('qa-tester-1759530219181@test.com', '12345');
    account.verifyLoggedIn('QA Tester');
    // Realiza logout usando o page object
    auth.logout();
    // Valida redirecionamento e elementos da tela de login
    cy.url().should('contain', 'login');
    cy.contains('Login to your account');
    cy.get('a[href="/logout"]').should('not.exist');
    cy.get('a[href="/login"]').should('contain', 'Signup / Login'); 
  });


  // Teste 5: tentativa de cadastro com email já existente e validação da mensagem
  it('Test Case 5: Register User with existing email', () => {
    auth.signup('QA Tester', 'qa-tester-1759530219181@test.com');
    cy.contains('button', 'Signup').click();
    cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!');
  });

  // Teste 6: formulário de contato usando fixture e upload de arquivo
  it('Test Case 6: Contact Us Form', () => {
    contact.openContact();
    contact.fillContact({
      name: userData.name,
      email: userData.email,
      subject: userData.subject,
      message: userData.message
    });
    contact.verifySuccess();
  });

  // Teste 8: navegação até produtos e verificação de elementos da página de detalhes
  it('Test Case 8: Verify All Products and product detail page', () => {
    // Faz login com helper e validações em produto com page object
    loginUser();
    products.goToProducts();
    cy.get('.title').should('be.visible');
    products.openProductByIndex(3);
    products.verifyProductInfo();
  });


  // Teste 9: pesquisa de produto
  it('Test Case 9: Search Product', () => {
    auth.login('qa-tester-1759530219181@test.com', '12345');
    products.goToProducts();
    products.searchProduct('Blue Top');
    cy.get('.productinfo > p').should('be.visible');
  });


  // Teste 10: valida inscrição na newsletter na página inicial
  it('Test Case 10: Verify Subscription in home page', () => {
    auth.login('qa-tester-1759530219181@test.com', '12345');
    cy.get('.single-widget > h2').scrollIntoView().should('be.visible');
    cy.get('#susbscribe_email').type('teste@teste.com');
    cy.get('#subscribe').click();
  });


  // Teste 15: fluxo de compra com registro, adição ao carrinho e pagamento
  it('Test Case 15: Place Order: Register before Checkout', () => {
    const data = createTestData();
    // Registra usuário utilizando o helper
    registerUser({ firstName: data.firstName, lastName: data.lastName, email: `qa-tester-${data.timestamp}@test.com`, mobile: data.converteu });

    //-------------------------------------------------------
    // Verifica login e navegação inicial
    cy.get('i.fa-user').parent().should('contain', data.firstName);
    cy.get('a[href="/logout"]').should('be.visible');

    cy.contains('b', data.firstName);
    cy.contains(`Logged in as ${data.firstName} ${data.lastName}`).should('be.visible');
    //---------------------------------------------------------
    // Adiciona produto ao carrinho e avança no fluxo de compra
    products.addProductToCartFromFeatures(3);
    products.verifyModalContains('Your product has been added to cart.');
    products.continueFromModal();

    // Verifica que o carrinho contém o produto correto
    products.verifyCartHasProduct('Blue Top');

    // Avança para a tela de checkout
    products.viewCartAndProceed();
    cy.get('[name="message"]').type('teste de software');
    cy.get(':nth-child(7) > .btn').click();
    // Preenche os campos de pagamento
    cy.get('[data-qa="name-on-card"]').type(data.nomeCartao);
    cy.get('[data-qa="card-number"]').type(data.numeroCartao);
    cy.get('[data-qa="cvc"]').type(data.cvc);
    cy.get('[data-qa="expiry-month"]').type(data.mesExpiracao.toString());
    cy.get('[data-qa="expiry-year"]').type(data.anoExpiracao.toString());
    cy.get('[data-qa="pay-button"]').click();
    // Valida sucesso na operação (mensagem de subscribe é usada no original)
    cy.get('.alert-success.alert').should('exist').and('contain.text', 'You have been successfully subscribed!');
    // Exclui conta ao final do fluxo
    account.deleteAccount();
  });


});