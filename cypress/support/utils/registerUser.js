import auth from '../../pages/auth.page';
import { faker } from '@faker-js/faker';

// Helper reutilizável para registrar um usuário.
// Exportamos a função para ser usada nos specs.
export function registerUser({ firstName, lastName, email, password = '12345', mobile = '111 222 333' }) {
  const name = `${firstName} ${lastName}`;
  // Preenche o formulário inicial (nome e email) e submete
  auth.signup(name, email);
  // Seleciona título, senha, data de nascimento e preferências
  auth.selectTitle('Mrs');
  auth.setPassword(password);
  auth.setDOB('20', 'September', '1992');
  auth.setPreferences({ newsletter: true, offers: true });
  // Preenche o restante do formulário de endereço
  auth.fillAddress({
    firstName,
    lastName,
    company: `PGATS ${faker.company.name()}`,
    address: faker.location.streetAddress(),
    country: 'Canada',
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobile
  });
  // Finaliza criação da conta e valida se foi criado com sucesso
  auth.createAccount();
  cy.url().should('includes', 'account_created');
  cy.contains('b', 'Account Created!');
  // Clica em continuar para seguir ao fluxo pós-criação
  auth.continueAfterCreate();
}
