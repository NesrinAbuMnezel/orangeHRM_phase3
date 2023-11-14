const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer"); 
module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com/",
        async setupNodeEvents(on: any, config: any) {
      // implement node event listeners here
      allureWriter(on, config); 
      return require("./cypress/plugins")(on, config);
    },
    specPattern: "cypress/e2e/**/*.feature",
    env: { 
      allureReuseAfterSpec: true, 
      download_dir: "./cypress/downloads", 
      allure: true, 
      allureResulsPath: "allure-results", 
      snapshotOnly: true,
      
    }, 
 downloadsFolder:'cypress/downloads',
    videosFolder: "allure-results/", 
    screenshotOnRunFailure: true, 
    
    // env: {
    //   download_dir: "./cypress/downloads",
    //   allure: true,
    //   allureResultsPath: "allure-results",
    //   screenshotsFolder: "allure-results",
    //   snapshotOnly: true,
    // },
    // reporterOptions: {
    //   types: ["@shelex/cypress-allure-plugin"],
    //   embeddedScreenshots: true,
    //   inlineAwssets: true,
    // },
    // videosFolder: "allure-results",
    // screenshotOnRunFailure: true,
  },
});