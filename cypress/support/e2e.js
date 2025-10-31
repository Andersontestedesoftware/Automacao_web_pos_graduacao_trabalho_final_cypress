// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-xpath';
import 'cypress-mochawesome-reporter/register';

// Global setup: intercept slow/external requests that may prevent page load
Cypress.on('window:before:load', (win) => {
	// noop - placeholder if needed
});

// Block common external assets (analytics/fonts) to speed up test runs and avoid load hang
beforeEach(() => {
	cy.intercept({ method: 'GET', url: /.*analytics.*/ }, { statusCode: 204 });
	cy.intercept({ method: 'GET', url: /.*googleapis.*/ }, { statusCode: 200, body: '' });
	cy.intercept({ method: 'GET', url: /.*fonts.googleapis.*/ }, { statusCode: 200, body: '' });
	// Clear cookies/localStorage between tests to avoid state leakage
	cy.clearCookies();
	cy.clearLocalStorage();
});
 
