// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => {
  cy.get('[data-testid="inputEmail"]').type(email);
  cy.get('[data-testid="inputPassword"]').type(password);
  cy.get('[data-testid="btnLogin"]').click();
});

Cypress.Commands.add("questionTextBox", () => {
  return cy.get("#input"); // Mengembalikan elemen questionbox
});

Cypress.Commands.add("answerLoadingView", () => {
  return cy.get('#chatbox #message .loading').contains('Ace is writing', { matchCase: false }); // Mengembalikan elemen loadingquestionbox
});

Cypress.Commands.add("answerChatBox", () => {
  return cy.get(":nth-child(3) > #chatbox > #message"); // Mengembalikan elemen answerchatbox
});