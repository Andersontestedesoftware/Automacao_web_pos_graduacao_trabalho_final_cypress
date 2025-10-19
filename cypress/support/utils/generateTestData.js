import { faker } from '@faker-js/faker';

// Gera um objeto com dados de teste comuns (nome, email, cartão, celular etc.)
export function createTestData() {
  const timestamp = new Date().getTime();
  const firstName = faker.person.firstName();
  const lastName = faker.person.firstName();
  const nomeCartao = faker.person.fullName();
  const numeroCartao = faker.finance.creditCardNumber('#### #### #### ####');
  const cvc = faker.finance.creditCardCVV();
  const mesExpiracao = faker.date.future().getMonth() + 1; // 1-12
  const anoExpiracao = faker.date.future().getFullYear();
  const celular = `119${faker.number.int({ min: 10000000, max: 99999999 })}`;
  const converteu = celular.replace(/\D/g, '');

  return {
    timestamp,
    firstName,
    lastName,
    nomeCartao,
    numeroCartao,
    cvc,
    mesExpiracao,
    anoExpiracao,
    celular,
    converteu
  };
}
