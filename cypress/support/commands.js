















































































































Cypress.Commands.add('criarMovimentacao', (movimentacao) => {
    cy.get('a[href="/movimentacao"]').click();
    cy.get('#tipo').type(movimentacao.tipo);
    cy.get('input[name="data_transacao"]').type(movimentacao.data_transacao);
    cy.get('input[name="data_pagamento"]').type(movimentacao.data_pagamento);
    cy.get('input[name="descricao"]').type(movimentacao.descricao);
    cy.get('input[name="interessado"]').type(movimentacao.interessado);
    cy.get('input[name="valor"]').type(movimentacao.valor);
    cy.get('select[name="conta"]').select(movimentacao.conta);
    cy.get('input[name="status"][value="1"]').click();
    cy.get('button[type="submit"]').click();
    cy.contains('Movimentação adicionada com sucesso!').should('be.visible');
});

Cypress.Commands.add('visitarResumoMensal', (mes, ano) => {
    cy.get('a[href="/extrato"]').contains('Resumo Mensal').click();
    cy.get('select[name="mes"]').select(mes);
    cy.get('select[name="ano"]').select(ano);
    cy.get('.btn-primary').contains('Buscar').click();
});