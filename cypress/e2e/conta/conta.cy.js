beforeEach(() =>{//executa antes de cada teste 
    cy.visit('/login')

    cy.login('testonauta1@hotmail.com', 'Teste123')
    
})

describe('Cenário 03 - Conta', () => {
    //nome da conta a ser utilizado nos teste conforme estabelecido no documento especificação de teste
    var nomeConta = 'Teste'
    var nomeContaEditada = 'Conta editada'
    const timestamp = new Date().getTime()

    console.log(nomeConta + timestamp)
    console.log(nomeContaEditada + timestamp)

    it('CT001 - Adicionar uma Conta', () => {
        cy.visit('/addConta')
        cy.preencherForm(nomeConta + timestamp)
        cy.submitForm()
        cy.validarMensagemSubmitForm("Conta adicionada com sucesso!")
    })

    it('CT002 - Adicionar uma conta com nome já cadastrado', () => {
        cy.visit('/addConta')
        cy.preencherForm(nomeConta + timestamp)
        cy.submitForm()
        cy.validarMensagemSubmitForm("Já existe uma conta com esse nome!")
        //cy.url().should('include', '/salvarConta')
    })

    it('CT003 - Adicionar uma conta com nome em branco', () => {
        cy.visit('/addConta')
        cy.preencherForm('{selectall}{backspace}')
        cy.submitForm()
        cy.validarMensagemSubmitForm("Informe o nome da conta")
    })

    it('CT004 - Validar lista de contas cadastradas', () => {
        //clica no menu Contas
        cy.get('#navbar').contains("Contas").click()

        //clica no submenu Listar
        cy.get('#navbar').contains("Listar").click()

        //verifica se a tabela que contém os nomes das contas cadastradas está sendo exibida
        cy.get('#tabelaContas').should('be.visible')

        //verifica se a conta com nome Teste está na tabela
        cy.get('#tabelaContas').should('contain.text', 'Teste')

        //verifica se o ícone de editar está sendo exibido
        cy.get('span').should("have.class", "glyphicon-edit").should("be.visible")

        //verifica se o ícone de excluir está sendo exibido
        cy.get('span').should("have.class",'glyphicon-remove-circle').should('be.visible')
    })

    it('CT005 - Editar conta - Alteração de nome', () => {
        cy.visit('/contas')

        //clica no ícone de editar da conta Teste
        cy.contains('tr', nomeConta + timestamp).find('span.glyphicon-edit').click()  

        //apaga o conteúdo do input
        cy.preencherForm('{selectall}{backspace}')

        //nomeConta = 'Conta editada'
        cy.preencherForm(nomeContaEditada + timestamp)

        cy.submitForm()
        cy.validarMensagemSubmitForm("Conta alterada com sucesso!")

    })

    it('CT006 - Editar conta com nome em branco', () => {
        cy.visit('/contas')

        //clica no ícone de editar da conta Teste
        cy.contains('tr', nomeContaEditada + timestamp).find('span.glyphicon-edit').click()  
        
        cy.preencherForm('{selectall}{backspace}')

        cy.submitForm()
        cy.validarMensagemSubmitForm("Informe o nome da conta")
    })
})