import { mount } from "cypress-angular-component-testing"
import { JiraControlModule } from "../jira-control.module"
import { SvgDefinitionsComponent } from "./svg-definitions.component"

describe('SvgDefinitionsComponent', () => {
    beforeEach(async() => {
        await mount(SvgDefinitionsComponent, {
            imports: [JiraControlModule]
        })
    })

    it('can mount', () => {
        cy.get('#arrow-down')
        cy.get('#arrow-up')
        cy.get('#board')
        cy.get('#bug')
        cy.get('#chevron-down')
        cy.get('#chevron-left')
        cy.get('#chevron-right')
        cy.get('#cog')
        cy.get('#component')
        cy.get('#feedback')
        cy.get('#filters')
        cy.get('#help')
        cy.get('#github')
        cy.get('#link')
        cy.get('#no-result')
        cy.get('#page')
        cy.get('#plus')
        cy.get('#report')
        cy.get('#search')
        cy.get('#ship')
        cy.get('#star')
        cy.get('#story')
        cy.get('#task')
        cy.get('#times')
        cy.get('#expand')
        cy.get('#trash')
        cy.get('#spin')
    })
})