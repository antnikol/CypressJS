const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // watchForFileChanges: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
     viewportWidth: 1024,
     viewportHeight: 768,
  },
});
