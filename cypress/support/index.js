Cypress.on('uncaught:exception', (err, runnable) => {
    console.log('Uncaught Exception:', err);
    return false; // Mencegah Cypress gagal karena error ini
  });