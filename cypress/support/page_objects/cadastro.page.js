class CadastroPage {
  cadastrarClienteComSucesso(email, password){
    cy.get('.icon-user-unfollow').click()
    cy.get('#reg_email').type(email)
    cy.get('#reg_password').type(password)
    cy.get(':nth-child(4) > .button').click()
  }
}

export default new CadastroPage()