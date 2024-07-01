describe('orders test', () => {
    it('should login as customer and submit invalid form', () => {
        cy.visit('http://localhost/login');
        cy.get('label').contains('Email').click();
        cy.get('label').contains('Email').siblings('input').type('customer@gmail.com');
        cy.get('input[type="password"]').click().type('customer1');
        cy.get('button').contains('Login').click();
        cy.wait(4000);
        cy.contains('div', 'Security').click();
        cy.get('div.central-window app-dynamic-table table tbody tr').should('be.visible');

        cy.get('div.central-window app-dynamic-table table tbody tr').first().within(() => {
            cy.get('button.btn-custom').contains('BUY').scrollIntoView().click();
        });

        cy.get('div.popup-body').should('be.visible');

        // Scroll the BUY button into view and click it
        cy.get('div.popup-body').within(() => {
            cy.get('button.button-primary').contains('BUY')
                .scrollIntoView() // Scroll the button into view
                .should('be.visible') // Ensure it is visible
                .click({ force: true }); // Force the click
        });

        cy.get('.popup-container').should('be.visible').and('contain.text', 'You are not allowed to take this action');
    }),
});
