Cypress.Commands.add('preencherDataAtual', (dataTransacao) => {
    const hoje = new Date();
    const dataFormatada = `${hoje.getDate().toString().padStart(2, '0')}/${(hoje.getMonth() + 1).toString().padStart(2, '0')}/${hoje.getFullYear()}`;
    cy.get(dataTransacao).type(dataFormatada);
  });

  Cypress.Commands.add('preencherDataFutura', (dataPagamento) => {
    const hoje = new Date();
    hoje.setDate(hoje.getDate() + 1);
    const dataFuturaFormatada = `${hoje.getDate().toString().padStart(2, '0')}/${(hoje.getMonth() + 1).toString().padStart(2, '0')}/${hoje.getFullYear()}`;
    cy.get(dataPagamento).type(dataFuturaFormatada);
  });
  
  Cypress.Commands.add('preencherDataAnterior', (dataPagamentoAnterior) => {
    const hoje = new Date();
    hoje.setDate(hoje.getDate() - 1);
    const dataAnteriorFormatada = `${hoje.getDate().toString().padStart(2, '0')}/${(hoje.getMonth() - 1).toString().padStart(2, '0')}/${hoje.getFullYear()}`;
    cy.get(dataPagamentoAnterior).type(dataAnteriorFormatada);
  });

  Cypress.Commands.add('clicaCriarMovimentacao', (movimentacao) => {
    cy.get(movimentacao).contains('Criar Movimentação').click();
  })

  Cypress.Commands.add('clicaBotaoSalvar', (clicaBotaoSalvar) => {
    cy.get(clicaBotaoSalvar).contains('Salvar').click();
  })

  Cypress.Commands.add('verificaDataMovimentacaoObtigatoria', (verificaDataMovimentacao) => {
    cy.get(verificaDataMovimentacao).contains('Data da Movimentação é obrigatório')
      .should('contain','Data da Movimentação é obrigatório');
  })

  Cypress.Commands.add('verificaDataPagamentoObrigatorio', (verificaDataPagamento) => {
    cy.get(verificaDataPagamento).contains('Data do pagamento é obrigatório')
    .should('contain','Data do pagamento é obrigatório');
  })

  Cypress.Commands.add('verificaDescricaoObrigatoria', (verificaDescricao) => {
    cy.get(verificaDescricao).contains('Descrição é obrigatório')
    .should('contain','Descrição é obrigatório');
  })

  Cypress.Commands.add('verificaInteressadoObrigatorio', (verificaInteressado) => {
    cy.get(verificaInteressado).contains('Interessado é obrigatório')
    .should('contain','Interessado é obrigatório');
  })

  Cypress.Commands.add('verificaValorObrigatorio', (verificaValor) => {
    cy.get(verificaValor).contains('Valor é obrigatório')
    .should('contain','Valor é obrigatório');
  })

  Cypress.Commands.add('verificaTipoValor', (verificaTipoValor) => {
    cy.get(verificaTipoValor).contains('Valor deve ser um número')
    .should('contain','Valor deve ser um número');
  })

  Cypress.Commands.add('selecionaTipoMovimentacao', (selecionaTipoMovimentacao) => {
    cy.get(selecionaTipoMovimentacao).select('DESP').find(':selected').should('have.text', 'Despesa');
  })

  Cypress.Commands.add('insereDescricao',(insereDescricao) => {
    cy.get(insereDescricao).type('Descrição Teste');
  })

  Cypress.Commands.add('insereInteressado', (insereInteressado) => {
    cy.get(insereInteressado).type('Interessado Teste');
  })

  Cypress.Commands.add('insereValor', (insereValor) => {
    cy.get(insereValor).type('100');
  })

  Cypress.Commands.add('marcaStatusPago', (marcaStatusPago) => {
    cy.get(marcaStatusPago).click();
  })

  Cypress.Commands.add('validaMensagemMovimentacaoAdicionada', (validaMensagemMovimentacaoAdicionada) => {
    cy.get(validaMensagemMovimentacaoAdicionada).contains('Movimentação adicionada com sucesso!');
  })

  Cypress.Commands.add('validaDataPagamentoMaiorQueDataMovimentacao', (validaDataPagamentoMaiorQueDataMovimentacao) => {
    cy.get(validaDataPagamentoMaiorQueDataMovimentacao).contains('Data do pagamento deve ser maior ou igual a Data da Movimentação')
    .should('contain','Data do pagamento deve ser maior ou igual a Data da Movimentação');
  })

  Cypress.Commands.add('validaDataMovimentacaoMenorOuIgualDataAtual', (validaDataMovimentacaoMenorOuIgualDataAtual) => {
    cy.get(validaDataMovimentacaoMenorOuIgualDataAtual).contains('Data da Movimentação deve ser menor ou igual à data atual')
      .should('contain', 'Data da Movimentação deve ser menor ou igual à data atual');
  })