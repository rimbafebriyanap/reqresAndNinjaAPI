Cypress.Commands.add("apiNinjaRequestGET", (endpoint) => {
  const baseUrl = Cypress.config("baseUrlNinjas");
  const apiKey = Cypress.env("APIKeyNinjas"); // Ambil API Key dari environment variables

  return cy.request({
    method: "GET",
    url: `${baseUrl}${endpoint}`,
    headers: {
      "X-Api-Key": apiKey,
      "Accept": "application/json",
    },
  })
});

Cypress.Commands.add("apiNinjaRequestPOST", (endpoint, body) => {
  const baseUrl = Cypress.config("baseUrlNinjas");
  const apiKey = Cypress.env("APIKeyNinjas"); // Ambil API Key dari environment variables

  return cy.request({
    method: "POST",
    url: `${baseUrl}${endpoint}`,
    headers: {
      "X-Api-Key": apiKey,
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: body
  });
});

Cypress.Commands.add('makeRequest', (method, endpoint, body = {}, failOnStatusCode = true) => {
  cy.request({
      method: method,
      url: `https://reqres.in/api${endpoint}`, // Base URL Reqres API
      body: body,
      failOnStatusCode: failOnStatusCode, // Mengatur apakah harus gagal saat status error
  });
});










