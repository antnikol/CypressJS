import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";
// import allureWriter from '@shelex/cypress-allure-plugin/writer.js'
import * as os from "node:os";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });
      // allureWriter(on, config);
      return config;
    },
    env: {
      allure: true,
    },
    baseUrl: 'https://automationexercise.com',
    viewportWidth: 1920,
    viewportHeight: 1080,
    chromeWebSecurity: false,
    requestTimeout: 7000,
    defaultCommandTimeout: 7000,
    specPattern: [
      'cypress/api/',
      'cypress/e2e/'
    ],
    retries: {
      runMode: 4,  
      openMode: 0, 
    },
  },
});
