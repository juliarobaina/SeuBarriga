beforeEach(() => {
    cy.visit('/login')
    cy.login('testonauta1@hotmail.com', 'Teste123')
})

describe('Cenário 03 - Conta', () => {
    const timestamp = new Date().getTime()
    const NOME_CONTA_PADRAO = `Teste_${timestamp}`
    let nomeConta = NOME_CONTA_PADRAO

    beforeEach(() => {
        nomeConta = NOME_CONTA_PADRAO
    })

    it('CT001 - Adicionar uma Conta', () => {
        cy.visit('/addConta')
        cy.preencherForm(nomeConta)
        cy.submitForm()
        cy.validarMensagemSubmitForm("Conta adicionada com sucesso!")
    })

    it('CT002 - Adicionar uma conta com nome já cadastrado', () => {
        // Primeiro, criar a conta
        cy.visit('/addConta')
        cy.preencherForm(nomeConta)
        cy.submitForm()
        
        // Tentar criar novamente com o mesmo nome
        cy.visit('/addConta')
        cy.preencherForm(nomeConta)
        cy.submitForm()
        cy.validarMensagemSubmitForm("Já existe uma conta com esse nome!")
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
        const novoNome = `Conta_Editada_${new Date().getTime()}`
        
        // Criar a conta
        cy.visit('/addConta')
        cy.preencherForm(nomeConta)
        cy.submitForm()
        
        // Navegar para lista de contas
        cy.visit('/contas')

        // Localizar e editar a conta
        cy.contains('tr', nomeConta)
            .should('be.visible')
            .within(() => {
                cy.get('span.glyphicon-edit')
                    .should('be.visible')
                    .click()
            })

        // Aguardar a página de edição carregar
        cy.url().should('include', '/editarConta')

        // Editar o nome usando um valor único
        cy.get('input[name="nome"]')
            .should('be.visible')
            .clear()
            .should('have.value', '') // Garantir que o campo foi limpo
            .type(novoNome)
            .should('have.value', novoNome) // Garantir que o novo valor foi digitado

        // Submeter o formulário
        cy.get('form[action="/salvarConta"]')
            .should('be.visible')
            .submit()

        // Validar mensagem de sucesso com retry
        cy.get('div[role="alert"]', { timeout: 10000 })
            .should('be.visible')
            .should(($el) => {
                expect($el.text()).to.include('Conta alterada com sucesso!')
            })
    })

    it('CT006 - Editar conta com nome em branco', () => {
        // Criar a conta primeiro
        cy.visit('/addConta')
        cy.preencherForm(nomeConta)
        cy.submitForm()
        
        cy.visit('/contas')

        // Localizar e editar a conta usando o nome correto
        cy.contains('tr', nomeConta)
            .should('be.visible')
            .within(() => {
                cy.get('span.glyphicon-edit').click()
            })
        
        cy.get('input[name="nome"]')
            .should('be.visible')
            .clear()

        cy.get('form[action="/salvarConta"]').submit()
        
        // Validar mensagem de erro
        cy.get('div[role="alert"]')
            .should('be.visible')
            .and('contain', 'Informe o nome da conta')
    })
})