describe('CT005 - Validar login com campo “Senha” em branco', () => {
    it('Deve exibir mensagem de erro ao tentar login com campo “Senha” em branco', () => {
        // Visita a página de login
        cy.visit('https://seubarriga.wcaquino.me/login');

        // Preenche o campo Email com o endereço de e-mail informado
        cy.get('input[name=email]').type('testonauta1@hotmail.com');

        // Deixa o campo Senha em branco
        // Clica no botão "Entrar"
        cy.get('button[type=submit]').click();

        // Verifica se a mensagem de erro é exibida
        cy.get('.alert-danger').should('be.visible').and('contain', 'Senha é um campo obrigatório');
    });
});
