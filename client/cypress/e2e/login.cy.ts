describe('Testes padrão', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve redirecionar para login', () => {

    cy.contains('Login de Usuário'); //assert
  });

  it('Deve autenticar usuário corretamente e redirecionar', () => {
    cy.get('[data-cy=login]').type('Teste2');

    cy.get('[data-cy=senha]').type('Teste@123');

    cy.get('[data-cy=submit]').click();

    cy.wait(2000);

    cy.contains('Painel de Controle');

    cy.url().should('contain', 'dashboard');
  });

  it('Deve notificar sobre formulário de login inválido', () => {
    cy.get('[data-cy=submit]').click();

    cy.contains('Por favor, corrija os campos inválidos do formulário.');
  });

  it('Deve notificar sobre formulário de login vazio', () => {
    cy.get('[data-cy=senha]').type('Teste@123');
    cy.get('[data-cy=submit]').click();

    cy.contains('o login precisa ser preenchido.');
  });

  it('Deve notificar sobre formulário de senha vazio', () => {
    cy.get('[data-cy=login]').type('Teste');
    cy.get('[data-cy=submit]').click();

    cy.contains('a senha precisa ser preenchido.');
  });
});
