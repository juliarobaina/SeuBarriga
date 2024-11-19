describe('Testes para validar movimentações de contas', () => {
    beforeEach(() => {
        cy.visit('https://seubarriga.wcaquino.me/login');
        cy.get('#email').type('automacao@mail.com');
        cy.get('#senha').type('1234');
        cy.get('.btn-primary').click();
        cy.get('.alert-success').should('contain', 'Bem vindo, Teste!')

        cy.get('.dropdown-toggle').contains('Contas ').click();
        cy.get('a[href="/contas"]').contains('Listar').click();

        cy.contains('tr', 'Conta Teste').then(($element) => {
            if ($element.length > 0) {
              // Conta existe
              cy.log('Conta encontrada!');
              cy.contains('tr', 'Conta Teste');
            } else {
              // Conta não existe
              cy.log('Conta não encontrada. Criando uma nova...');
              cy.get('a[href="/addConta').contains('Adicionar').click();
              cy.get('nome').type('Conta Teste');
              cy.get('.btn-primary').contains('Salvar').click();
              cy.get('.alert-success').contains('Conta adicionada com sucesso!');
            }
          });          
    });

    it('Criar movimentação com dados válidos', () => {
        cy.get('a[href="/movimentacao"]').contains('Criar Movimentação').click();
        cy.get('#tipo').select('DESP').find(':selected').should('have.text', 'Despesa');
        cy.preencherDataAtual('#data_transacao');
        cy.preencherDataFutura('#data_pagamento');
        cy.get('#descricao').type('Descrição Teste');
        cy.get('#interessado').type('Interessado Teste');
        cy.get('#valor').type('100');
        cy.get('#conta').select('2321146').find(':selected').should('have.text', 'Conta Teste');
        cy.get('#status_pago').click();
        cy.get('.btn-primary').contains('Salvar').click();
        cy.get('.alert-success').contains('Movimentação adicionada com sucesso!');
    })
})