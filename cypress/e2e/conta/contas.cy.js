/*before(() =>{
    
})*/
beforeEach(() =>{//executa antes de cada teste 
    cy.visit('https://seubarriga.wcaquino.me/login')

    cy.login('testonauta1@hotmail.com', 'Teste123')

})
describe('Cenário 03 - Conta', () => {
    var nomeConta = 'Teste'
    it('CT001 - Adicionar uma Conta', () => {
        cy.preencherFormAddConta(nomeConta)
        cy.submitFormAddConta()
        cy.validarMensagemSubmitFormAddConta("Conta adicionada com sucesso!")
    })

    it('CT002 - Adicionar uma conta com nome já cadastrado', () => {
        cy.preencherFormAddConta(nomeConta)
        cy.submitFormAddConta()
        cy.validarMensagemSubmitFormAddConta("Já existe uma conta com esse nome!")
        //cy.url().should('include', '/salvarConta')
    })

    it('CT003 - Adicionar uma conta com nome em branco', () => {
        cy.preencherFormAddConta('{selectall}{backspace}')
        cy.submitFormAddConta()
        cy.validarMensagemSubmitFormAddConta("Informe o nome da conta")
    })

    it('CT004 - Validar lista de contas cadastradas', () => {
        cy.get('#navbar').contains("Contas").click()
        cy.get('#navbar').contains("Listar").click()

        cy.get('#tabelaContas').should('be.visible')
        cy.get('#tabelaContas').should('contain.text', 'Teste')

        cy.get('span').should("have.class", "glyphicon-edit").should("be.visible")
        cy.get('span').should("have.class",'glyphicon-remove-circle').should('be.visible')

    })

    it('CT005 - Editar conta - Alteração de nome', () => {
        cy.visit('https://seubarriga.wcaquino.me/contas')
          // Encontra a <td> que contém o texto 'Teste'
          // Vai até o <tr> pai (linha da tabela)
           // Encontra o <span> com a classe 'glyphicon-edit'
           // Simula o clique no ícone de edição
        cy.contains('td', 'Teste').parent().find('span.glyphicon-edit').click()  
        
        cy.preencherFormEditarConta('{selectall}{backspace}')
        cy.preencherFormEditarConta('Teste2')
        cy.submitFormEditarConta()
        cy.validarMensagemSubmitFormAddConta("Conta alterada com sucesso!")

    })

    it('CT006 - Editar conta com nome em branco', () => {
        cy.visit('https://seubarriga.wcaquino.me/contas')
        cy.contains('td', 'Teste').parent().find('span.glyphicon-edit').click()  
        
        cy.preencherFormEditarConta('{selectall}{backspace}')

        cy.submitFormEditarConta()
        cy.validarMensagemSubmitFormAddConta("Informe o nome da conta")
    })
})