describe('CT002 - Validar login com email invalido', () => {
    it('Deve exibir mensagem de erro ao tentar login com email invalido', () => {
        // Visita a página de login
        cy.visit('https://seubarriga.wcaquino.me/login');

        // Preenche o campo Email com o e-mail informado
        cy.get('input[name=email]').type('testonauta0@hotmail.com');

        // Preenche o campo Senha com a senha informada
        cy.get('input[name=senha]').type('Teste123');

        // Clica no botão "Entrar"
        cy.get('button[type=submit]').click();

        // Verifica se a mensagem de erro é exibida
        cy.get('.alert-danger').should('be.visible').and('contain', 'Problemas com o login');
    });
});
