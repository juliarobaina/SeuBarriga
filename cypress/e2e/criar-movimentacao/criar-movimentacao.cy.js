describe('Testes para validar movimentações de contas', () => {

  beforeEach(() => {
    cy.visit('https://seubarriga.wcaquino.me/login');
    cy.get('#email').type('automacao@mail.com');
    cy.get('#senha').type('1234');
    cy.get('.btn-primary').click();
    cy.get('.alert-success').should('contain', 'Bem vindo, Teste!');
  });

  it('Criar movimentação com dados válidos', () => {
    cy.clicaCriarMovimentacao('a[href="/movimentacao"]');
    cy.selecionaTipoMovimentacao('#tipo');
    cy.preencherDataAtual('#data_transacao');
    cy.preencherDataFutura('#data_pagamento');
    cy.insereDescricao('#descricao');
    cy.insereInteressado('#interessado');
    cy.insereValor('#valor');
    cy.marcaStatusPago('#status_pago');
    cy.clicaBotaoSalvar('.btn-primary');
    cy.validaMensagemMovimentacaoAdicionada('.alert-success');
  });

  it('Criar movimentação sem preencher os campos', () => {
    cy.clicaCriarMovimentacao('a[href="/movimentacao"]');
    cy.clicaBotaoSalvar('.btn-primary');
    cy.verificaDataMovimentacaoObtigatoria('.alert-danger');
    cy.verificaDataPagamentoObrigatorio('.alert-danger');
    cy.verificaDescricaoObrigatoria('.alert-danger');
    cy.verificaInteressadoObrigatorio('.alert-danger');
    cy.verificaValorObrigatorio('.alert-danger');
    cy.verificaTipoValor('.alert-danger');
  });

  it('Criar movimentação paga sem data de pagamento', () => {
    cy.clicaCriarMovimentacao('a[href="/movimentacao"]');
    cy.selecionaTipoMovimentacao('#tipo');
    cy.preencherDataAtual('#data_transacao');
    cy.insereDescricao('#descricao');
    cy.insereInteressado('#interessado');
    cy.insereValor('#valor');
    cy.marcaStatusPago('#status_pago');
    cy.clicaBotaoSalvar('.btn-primary');
    cy.verificaDataPagamentoObrigatorio('.alert-danger');
  });

  it('Criar movimentação com data de pagamento menor que data atual', () => {
    cy.clicaCriarMovimentacao('a[href="/movimentacao"]');
    cy.selecionaTipoMovimentacao('#tipo');
    cy.preencherDataAtual('#data_transacao');
    cy.preencherDataAnterior('#data_pagamento');
    cy.insereDescricao('#descricao');
    cy.insereInteressado('#interessado');
    cy.insereValor('#valor');
    cy.marcaStatusPago('#status_pago');
    cy.clicaBotaoSalvar('.btn-primary');
    cy.log('Deve mostrar a mensagem: Data do pagamento deve ser maior ou igual a Data da Movimentação');
    cy.validaDataPagamentoMaiorQueDataMovimentacao('.alert-danger');
  });

  it('Criar movimentação com data da movimentação maior que a data atual', () => {
    cy.clicaCriarMovimentacao('a[href="/movimentacao"]');
    cy.selecionaTipoMovimentacao('#tipo');
    cy.preencherDataFutura('#data_transacao');
    cy.preencherDataFutura('#data_pagamento');
    cy.insereDescricao('#descricao');
    cy.insereInteressado('#interessado');
    cy.insereValor('#valor');
    cy.marcaStatusPago('#status_pago');
    cy.clicaBotaoSalvar('.btn-primary');
    cy.validaDataMovimentacaoMenorOuIgualDataAtual('.alert-danger');
  });
});