# Automação Web — Pós-Graduação

Repositório com exemplos de automação end-to-end usando Cypress contra https://automationexercise.com.
O código foi organizado com page objects e helpers para facilitar leitura, manutenção e reuso.

## Estrutura principal
- `cypress/e2e/` — specs (cenários de teste)
- `cypress/pages/` — page objects (classes/objetos que expõem ações e seletores)
- `cypress/support/utils/` — helpers e geradores de dados
- `cypress.config.js` — configuração do Cypress e do repórter

## Pré-requisitos
- Node.js (recomendado v16+)
- npm

## Instalação
No PowerShell, na raiz do projeto:

```powershell
npm install
```

## Comandos úteis
- Rodar todos os testes (headless):

```powershell
npx cypress run
```

- Rodar apenas o spec principal:

```powershell
npx cypress run --spec "cypress/e2e/trabalho_final.cy.js"
```

- Rodar com o repórter mochawesome (gera relatórios em `cypress/reports`):

```powershell
npx cypress run --reporter cypress-mochawesome-reporter
```

> Se o `package.json` tiver scripts, você também pode usar `npm run cy:run` ou `npm run test:ci` conforme disponíveis.

## Relatórios e screenshots
- Quando configurado, o repórter `cypress-mochawesome-reporter` cria JSON/HTML em `cypress/reports/`.
- Screenshots (se habilitados) são salvos em `cypress/reports/screenshots/`.
- Observação: a configuração atual foi ajustada para gerar um único `index.html` e sobrescrever o relatório anterior em cada execução (evita criar arquivos numerados/timestamped).

## CI / GitHub Actions
Há um workflow de exemplo em `.github/workflows/cypress.yml` que executa o spec `trabalho_final.cy.js` e publica `cypress/reports` como artifact.