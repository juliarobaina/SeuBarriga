describe("Testes para validar Resumo Mensal", () => {

    beforeEach(() => {

        cy.visit('https://seubarriga.wcaquino.me/login');
        cy.get('#email').type('tester@email.com');
        cy.get('#senha').type('1234');
        cy.get('button[type="submit"]').click();

        // Criação de movimentação
        const movimentacao = {
            tipo: 'Receita',
            data_transacao: '20/11/2024',
            data_pagamento: '30/11/2024',
            descricao: 'teste',
            interessado: 'Interessado teste',
            valor: '100',
            conta: 'conta-teste'
        };
        cy.criarMovimentacao(movimentacao);

    })

    it("Validar listagem de resumo", () => {
        
        cy.visitarResumoMensal('Novembro', '2024');

        cy.get('#tabelaExtrato thead tr th').should('have.length', 6)
        cy.get('#tabelaExtrato tr th').eq(0).should('contain.text', 'Descrição')
        cy.get('#tabelaExtrato tr th').eq(1).should('contain.text', 'Dt Pagamento')
        cy.get('#tabelaExtrato tr th').eq(2).should('contain.text', 'Conta')
        cy.get('#tabelaExtrato tr th').eq(3).should('contain.text', 'Valor')
        cy.get('#tabelaExtrato tr th').eq(4).should('contain.text', 'Situação')
        cy.get('#tabelaExtrato tr th').eq(5).should('contain.text', 'Ações')

        cy.get('#tabelaExtrato tbody tr').eq(0).within(() => {   
            cy.get('td').eq(0).should('contain.text', 'teste');
            cy.get('td').eq(1).should('contain.text', '30/11/2024');
            cy.get('td').eq(2).should('contain.text', 'conta-teste');
            cy.get('td').eq(3).should('contain.text', '100');
            cy.get('td').eq(4).should('contain.text', 'Pago');
        })
    })

    it("Excluir movimentação do resumo", () => {

        cy.visitarResumoMensal('Novembro', '2024');

        cy.get('#tabelaExtrato tbody tr').contains('teste').parent().find('a').click();

        //Validar a mensagem que a conta foi excluida
        cy.contains('Movimentação removida com sucesso!').should('be.visible');
    }) 
})
