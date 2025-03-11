const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    experimentalStudio: true,
    baseUrl: 'https://staging.rekava.build',
    baseUrlDev: "https://reqres.in/api",
    baseUrlNinjas: "https://api.api-ninjas.com/v1/",
    env:{
      APIKeyNinjas: "dw/q3X2gDb4XKRzLYykegQ==kUwwL1gJw56oYbe8",
    }
  },
  viewportWidth: 1280, // Lebar viewport default
  viewportHeight: 720, // Tinggi viewport default
});
