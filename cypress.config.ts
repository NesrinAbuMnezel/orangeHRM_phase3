const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on: any, config: any) {
      // implement node event listeners here
      allureWriter(on, config);
      return config;
      return require("./cypress/plugins")(on, config);
    },
    env: {
      allureReuseAfterSpec: true,
      download_dir: "./cypress/downloads",
      allure: true,
      allureResulsPath: "allure-results",
      snapshotOnly: true,

    },
    downloadsFolder: 'cypress/downloads',
    videosFolder: "allure-results/",
    screenshotOnRunFailure: true,
  },
});
