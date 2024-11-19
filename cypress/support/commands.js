Cypress.Commands.add('preencherDataAtual', (seletor) => {
    const hoje = new Date();
    const dataFormatada = `${hoje.getDate().toString().padStart(2, '0')}/${(hoje.getMonth() + 1).toString().padStart(2, '0')}/${hoje.getFullYear()}`;
    cy.get(seletor).type(dataFormatada);
  });

  Cypress.Commands.add('preencherDataFutura', (seletor) => {
    const hoje = new Date();
    const dataFutura = new Date(hoje);
    dataFutura.setDate(hoje.getDate() + 1);
    const dataFuturaFormatada = `${dataFutura.getDate().toString().padStart(2, '0')}/${(dataFutura.getMonth() + 1).toString().padStart(2, '0')}/${dataFutura.getFullYear()}`;
    cy.get(seletor).type(dataFuturaFormatada);
  });
  