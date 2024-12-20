import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";
import * as os from "node:os";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });
      return config;
    },
    baseUrl: 'https://automationexercise.com',
    viewportWidth: 1024,
    viewportHeight: 768,
    chromeWebSecurity: false,
    requestTimeout: 7000,
    defaultCommandTimeout: 7000,
  },
});
