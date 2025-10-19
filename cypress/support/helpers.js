import { faker } from '@faker-js/faker'; // Import the faker library

export function getRandomNumber() {
  return faker.number.bigInt();
}

export function getRandomEmail() {
  return faker.internet.email({ firstName: 'QATesterPgats' });
}