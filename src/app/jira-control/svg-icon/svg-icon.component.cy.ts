import { mount, MountResponse } from "cypress-angular-component-testing"
import { SvgIconComponent } from "./svg-icon.component"

describe('SvgIconComponent', () => {
    let response: MountResponse<SvgIconComponent>;

    beforeEach(async() => {
        response = await mount(SvgIconComponent)
    })

    it('can mount', () => {
        cy.get('svg');
    })

    it('renders the icon size from the @Input() prop', () => {
        response.component.name = 'plus';
        response.component.size = 128;
        response.fixture.detectChanges();
        cy.get('svg').invoke('outerWidth').should('equal', 128)
    })
})