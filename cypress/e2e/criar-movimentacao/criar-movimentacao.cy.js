describe('Testes para validar movimentações de contas', () => {
  beforeEach(() => {
    cy.visit('https://seubarriga.wcaquino.me/login');
    cy.get('#email').type('automacao@mail.com');
    cy.get('#senha').type('1234');
    cy.get('.btn-primary').click();
    cy.get('.alert-success').should('contain', 'Bem vindo, Teste!')
    cy.get('.dropdown-toggle').contains('Contas ').click();
    cy.get('a[href="/contas"]').contains('Listar').click();
  });

  it('Criar movimentação com dados válidos', () => {
    cy.get('a[href="/movimentacao"]').contains('Criar Movimentação').click();
    cy.get('#tipo').select('DESP').find(':selected').should('have.text', 'Despesa');
    cy.preencherDataAtual('#data_transacao');
    cy.preencherDataFutura('#data_pagamento');
    cy.get('#descricao').type('Descrição Teste');
    cy.get('#interessado').type('Interessado Teste');
    cy.get('#valor').type('100');
    cy.get('#conta').select('Conta Teste').find(':selected').should('have.text', 'Conta Teste');
    cy.get('#status_pago').click();
    cy.get('.btn-primary').contains('Salvar').click();
    cy.get('.alert-success').contains('Movimentação adicionada com sucesso!');
  });

  it('Criar movimentação sem preencher os campos', () => {
    cy.get('a[href="/movimentacao"]').contains('Criar Movimentação').click();
    cy.get('.btn-primary').contains('Salvar').click();
    cy.get('.alert-danger').contains('Data da Movimentação é obrigatório')
      .should('contain','Data da Movimentação é obrigatório');
    cy.get('.alert-danger').contains('Data do pagamento é obrigatório')
      .should('contain','Data do pagamento é obrigatório');
    cy.get('.alert-danger').contains('Descrição é obrigatório')
      .should('contain','Descrição é obrigatório');
    cy.get('.alert-danger').contains('Interessado é obrigatório')
      .should('contain','Interessado é obrigatório')
    cy.get('.alert-danger').contains('Valor é obrigatório')
      .should('contain','Valor é obrigatório');
    cy.get('.alert-danger').contains('Valor deve ser um número')
      .should('contain','Valor deve ser um número');
  });
});