import { mount } from "cypress-angular-component-testing"
import { MountResponse } from "cypress-angular-component-testing/lib/mount"
import { JiraControlModule } from "../jira-control.module";
import { AvatarComponent } from "./avatar.component"

describe('AvatarComponent', () => {
    let response: MountResponse<AvatarComponent>;

    beforeEach(async () => {
        response = await mount(AvatarComponent, {
            imports: [JiraControlModule],
            inputs: { avatarUrl: 'https://res.cloudinary.com/dvujyxh7e/image/upload/c_scale,w_128/v1593253478/trung-vo_bioxmc.png' }
        })
        cy.get('.avatar-container').as('avatar');
    })

    it('can mount', async () => {
        cy.get('@avatar').should('be.visible')
    })

    it('sets the image width to the @Input size prop', async () => {
        response.component.size = 128;
        response.fixture.detectChanges();
        cy.get('@avatar').invoke('outerWidth').should('equal', 128)
        cy.get('@avatar').invoke('outerHeight').should('equal', 128)
    })
})