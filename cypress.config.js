const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
  // Ajustes de timeout para reduzir falsos negativos em ambientes lentos (CI)
  pageLoadTimeout: 120000,
  defaultCommandTimeout: 10000,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Cypress Test Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      // Produce a fixed filename and do not append timestamps so the same
      // index.html is reused each run. Overwrite ensures the previous
      // report is replaced instead of creating numbered copies.
      mochawesome_filename: 'index',
      reportFilename: 'index',
      timestamp: false,
      overwrite: true,
      html: true,
      json: true,
      reportDir: 'cypress/reports'
    },
    // Store screenshots inside reports folder so they're uploaded by the CI artifact step
    screenshotsFolder: 'cypress/reports/screenshots',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
