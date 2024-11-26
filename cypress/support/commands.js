Cypress.Commands.add('login', (email, senha) => {
    cy.get('input[name=email]').type(email)

    cy.get('input[name=senha]').type(senha)

    cy.get('button[type=submit]').click()
})

Cypress.Commands.add('preencherForm', (nome) => {
    cy.get('input[name="nome"]').type(nome)
})

Cypress.Commands.add('submitForm', () => {
    cy.get('form[action="/salvarConta"][method="POST"]').submit()
})

Cypress.Commands.add('validarMensagemSubmitForm', (msg) => {
    cy.get('div[role="alert"]').contains(msg).should("be.visible")
})