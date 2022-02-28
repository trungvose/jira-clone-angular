// TODO: source the example support file

Cypress.Commands.add('setFormInputByLabel', (label, value) => {
    return cy.get('form').contains('label', label).parent().find('input').type(value)
})
