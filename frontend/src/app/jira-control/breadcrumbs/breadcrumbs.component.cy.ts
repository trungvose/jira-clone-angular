import { mount, MountResponse } from "cypress-angular-component-testing"
import { BreadcrumbsComponent } from "./breadcrumbs.component"

describe('BreadcrumbsComponent', () => {
    let response: MountResponse<BreadcrumbsComponent>

    beforeEach(async() => {
        response = await mount(BreadcrumbsComponent);
        cy.get('.text-textMedium').as('breadcrumbs');
    })

    it('can mount', () => {
        response.component.items = ['1st link', '2nd link'];
        response.fixture.detectChanges();
        cy.get('@breadcrumbs').should('be.visible');
    })
})