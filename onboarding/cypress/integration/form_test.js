


describe("Testing form inputs.", function() {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });

    it("Tests form inputs", () => {
        cy.get(`[data-cy="name"]`).type("Taylor Wise").should("have.value", "Taylor Wise");

        cy.get(`[data-cy="email"]`).type("taylorwise@lambda.com").should("have.value", "taylorwise@lambda.com");

        cy.get(`[data-cy="password"]`).type("Password123").should("have.value", "Password123");

        cy.get(`[type="checkbox"]`).check().should("be.checked");

        cy.get("form").submit();
    });

    it("Tests validation if input is blank", () => {
        cy.get(`[data-cy="name"]`).type("Taylor Wise").should("have.value", "Taylor Wise");

        cy.get(`[data-cy="email"]`)

        cy.get(`[data-cy="password"]`).type("Password123").should("have.value", "Password123");

        cy.get(`[type="checkbox"]`).check().should("be.checked");

        cy.get(`[data-cy="submitButton"]`).should("be.disabled")
    })
});