describe('Ao acessar a página de Listagem de Contatos', () => {
  beforeEach(() => {

  });
  it('Deve carregar a listagem corretamente', () => {
    cy.visit('/contatos');

    cy.contains('h1', 'Listagem de Contatos');

    cy.url().should('contain', '/contatos');
  });
});
