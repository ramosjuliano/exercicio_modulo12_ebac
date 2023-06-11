/// <reference types="cypress" />
import CheckoutPage from "../support/page_objects/checkout.page"
import CadastroPage from "../support/page_objects/cadastro.page"
import { faker } from '@faker-js/faker'
const produto = require('../fixtures/produto.json')
const perfil = require('../fixtures/perfil.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente
        Quero acessar a Loja EBAC
        Para fazer um pedido de 4 produtos
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

        beforeEach(() => {
            cy.visit("/")
        });

        it('Teste End-to-End - Fluxo Pedido', () => {
            CadastroPage.cadastrarClienteComSucesso(faker.internet.email(), faker.internet.password())

            cy.get('.topbar-inner > :nth-child(1) > .list-inline > :nth-child(2)').should('contain', 'Logout')
            cy.get('#primary-menu > .menu-item-629 > a').click()

            cy.adicionarItemCarrinho(
                produto[1].codProduto,
                produto[1].tamanho,
                produto[1].cor,
                produto[1].quantidade
            )

            cy.get('.woocommerce-message > .button').click()
            cy.get('.checkout-button').click()

            CheckoutPage.adicionarDadosCheckout(
                perfil[1].nome,
                perfil[1].sobrenome,
                perfil[1].empresa,
                perfil[1].pais,
                perfil[1].endereco,
                perfil[1].numero,
                perfil[1].cidade,
                perfil[1].estado,
                perfil[1].cep,
                perfil[1].telefone,
                perfil[1].email,
                perfil[1].mensagemOpcional
            )

            cy.get('.woocommerce-notice').should('contain', 'Seu pedido foi recebido')
        });

})