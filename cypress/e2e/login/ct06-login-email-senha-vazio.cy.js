describe('CT006 - Validar login com campos em branco', () => {
    it('Deve exibir mensagem de erro ao tentar login com campos "Email" e "Senha" em branco', () => {
        // Visita a página de login
        cy.visit('https://seubarriga.wcaquino.me/login');

        // Deixa o campo Email em branco
        // Deixa o campo Senha em branco
        // Clica no botão "Entrar"
        cy.get('button[type=submit]').click();

        // Verifica se a mensagem de erro é exibida
        cy.get('.alert-danger').should('be.visible').and('contain', 'Email é um campo obrigatório');
        cy.get('.alert-danger').should('be.visible').and('contain', 'Senha é um campo obrigatório');
    });
});