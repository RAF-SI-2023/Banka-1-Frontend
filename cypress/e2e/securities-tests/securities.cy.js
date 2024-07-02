describe('orders test', () => {
    it('should login as customer and submit invalid form', () => {
        cy.viewport(1920, 1080);
        cy.visit('http://localhost:4200/login');
        cy.get('label').contains('Email').click();
        cy.get('label').contains('Email').siblings('input').type('customer@gmail.com');
        cy.get('input[type="password"]').click().type('customer');
        cy.get('button').contains('Login').click();
        cy.wait(4000);
        cy.contains('div', 'Security').click();
        cy.get('body > app-root > div > div:nth-child(3) > app-securities-legal-persons > div > div > div.central-window > div.history-tab.ng-star-inserted > app-dynamic-table > div > table > tbody').should('be.visible');

        cy.get('body > app-root > div > div:nth-child(3) > app-securities-legal-persons > div > div > div.central-window > div.history-tab.ng-star-inserted > app-dynamic-table > div > table > tbody > tr:nth-child(1)').first().within(() => {
            cy.get('button[class="btn-custom"]').scrollIntoView().contains('BUY').scrollIntoView().click();
        });

        cy.get('div.popup-body').should('be.visible');

        // Scroll the BUY button into view and click it
        cy.get('div.popup-body').within(() => {
            cy.get('button.button-primary').eq(1).scrollIntoView().contains('BUY')
                .scrollIntoView() // Scroll the button into view
                .should('be.visible') // Ensure it is visible
                .click({ force: true }); // Force the click
        });

        cy.get('.popup-container').should('be.visible').and('contain.text', 'OptionsXInvalid order amount');
    })
});
