import { mount, MountResponse } from "cypress-angular-component-testing"
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { InputComponent } from "./input.component"

describe('InputComponent', () => {
    let response: MountResponse<InputComponent>;

    beforeEach(async() => {
        response = await mount(InputComponent, {
            declarations: [SvgIconComponent]
        })

        cy.get('.input-container').as('input');
    })

    it('can mount', () => {
        cy.get('@input').should('be.visible')
    })

    it('displays the icon when passes as an @Input() prop', () => {
        response.component.icon = 'test';
        response.fixture.detectChanges();
        cy.get('@input');
        cy.get('svg-icon').should('be.visible');
    })

    it('can type in the input', () => {
        cy.get('input').type('testing...')
    })
})