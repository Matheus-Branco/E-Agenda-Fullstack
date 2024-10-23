describe('Testes padrão', () => {
  it('Deve redirecionar para login', () => {
    cy.visit('/');

    cy.contains('Login de Usuário')
  });
});
