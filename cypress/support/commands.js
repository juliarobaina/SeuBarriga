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