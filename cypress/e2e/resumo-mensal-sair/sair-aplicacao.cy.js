describe('Validar o logout da aplicação', () => {

    it('Sair da aplicação',() => {
        // Realiza o login
        cy.visit('https://seubarriga.wcaquino.me/login');
        cy.get('input[name=email]').type('tester@email.com');
        cy.get('input[name=senha]').type('1234');
        cy.get('button[type="submit"]').click();
        cy.contains('Bem vindo, tester1234!');

        cy.get('a[href="/logout"]').contains('Sair').click();

        cy.url().should('include', '/logout')

    })
})