describe('Create Issue', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open create issue modal', () => {
    cy.get("[aria-label='Create issue']").click();
    cy.get("nz-modal-container .modal-title").should("have.text", "Create issue")
  });
});
