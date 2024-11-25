// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, senha) => {
    // Preenche o campo Email com o e-mail informado
    cy.get('input[name=email]').type(email)

    // Preenche o campo Senha com a senha informada
    cy.get('input[name=senha]').type(senha)

    // Clica no botão "Entrar"
    cy.get('button[type=submit]').click()
})

Cypress.Commands.add('preencherFormAddConta', (nome) => {
   // cy.get('#navbar').contains("Contas").click()
    //cy.get('#navbar').contains("Adicionar").click()

    cy.visit('https://seubarriga.wcaquino.me/addConta')
    cy.get('input[name="nome"]').type(nome)

})

Cypress.Commands.add('submitFormAddConta', () => {
    cy.get('form[action="/salvarConta"][method="POST"]').submit()//funciona
})

Cypress.Commands.add('validarMensagemSubmitFormAddConta', (msg) => {
    cy.get('div[role="alert"]').contains(msg).should("be.visible")
})

Cypress.Commands.add('preencherFormEditarConta', (nome) => {
    cy.get('input[name="nome"]').type(nome)
})

Cypress.Commands.add('submitFormEditarConta', () => {
    cy.get('form[action="/salvarConta"][method="POST"]').submit()//funciona
})
