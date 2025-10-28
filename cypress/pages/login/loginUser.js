import auth from '../account/auth.page';
import account from '../account/account.page';

// Helper para efetuar login e verificar que o usuário está logado
export function loginUser(email = 'qa-tester-1759530219181@test.com', password = '12345', fullName = 'QA Tester') {
  auth.login(email, password);
  account.verifyLoggedIn(fullName);
}
