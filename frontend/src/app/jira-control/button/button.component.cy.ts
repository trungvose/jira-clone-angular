import { mount, MountResponse } from "cypress-angular-component-testing"
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { ButtonComponent } from "./button.component"

describe('ButtonComponent', () => {
    let response: MountResponse<ButtonComponent>;

    beforeEach(async() => {
        response = await mount(ButtonComponent, {
            declarations: [SvgIconComponent]
        })

        cy.get('button').as('button');
    })

    it('can mount', () => {
        cy.get('@button').should('be.visible').should('not.be.disabled')
    })

    it('disabled the button when passed in as an @Input() prop', () => {
        response.component.disabled = true;
        response.fixture.detectChanges();
        cy.get('@button').should('be.disabled')
    })
})