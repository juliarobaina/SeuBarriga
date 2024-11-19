describe('CT004 - Validar login com campo “Email” em branco', () => {
    it('Deve exibir mensagem de erro ao tentar login com campo “Email” em branco', () => {
        // Visita a página de login
        cy.visit('https://seubarriga.wcaquino.me/login');

        // Deixa o campo Email em branco e preenche o campo Senha
        cy.get('input[name=senha]').type('Teste123');

        // Clica no botão "Entrar"
        cy.get('button[type=submit]').click();

        // Verifica se a mensagem de erro é exibida
        cy.get('.alert-danger').should('be.visible').and('contain', 'Email é um campo obrigatório');
    });
});
