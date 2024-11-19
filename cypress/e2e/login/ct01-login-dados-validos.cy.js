describe('CT001 - Validar login com dados válidos', () => {
    it('Deve fazer login com sucesso usando dados válidos', () => {
        // Visita a página de login
        cy.visit('https://seubarriga.wcaquino.me/login');

        // Preenche o campo Email com o e-mail informado
        cy.get('input[name=email]').type('testonauta1@hotmail.com');

        // Preenche o campo Senha com a senha informada
        cy.get('input[name=senha]').type('Teste123');

        // Clica no botão "Entrar"
        cy.get('button[type=submit]').click();

        // Verifica se a tela inicial da conta criada é exibida
        cy.url().should('include', '/logar');
        cy.contains('Bem vindo, Testonauta Um!');
    });
});