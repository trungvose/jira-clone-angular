/// <reference types="cypress" />

describe('Creates A New Jira Issue', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/project/board')
    })

    it('can create a new bug', () => {
        cy.get('i.anticon-plus').click();
        cy.get('add-issue-modal').should('be.visible')
        cy.get('div.text-xl').contains('Create issue');
        cy.get('issue-type-select').click();
        cy.get('nz-option-item').should('have.attr', 'ng-reflect-value', 'Bug').eq(0).click();
        cy.setFormInputByLabel('Short summary', 'My Really Bad Bug')
        cy.get('quill-editor').type('This is where I describe how bad the bug is');
        cy.get('issue-reporter-select').click();
        cy.get('nz-option-item').eq(4).click();
        cy.get('issue-assignees-select').click();
        cy.get('nz-option-item').eq(3).click();
        cy.get('button').contains('Create Issue').click();
        cy.get('issue-card').contains('p', 'My Really Bad Bug').click();
        cy.get('issue-modal').should('be.visible');
    })
})