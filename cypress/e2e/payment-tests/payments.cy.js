describe('orders test', () => {
    it('should login as customer and submit invalid form', () => {
        cy.visit('http://localhost:4200/login');
        cy.get('label').contains('Email').click();
        cy.get('label').contains('Email').siblings('input').type('customer@gmail.com');
        cy.get('input[type="password"]').click().type('customer1');
        cy.get('button').contains('Login').click();
        cy.wait(4000);
        cy.contains('div', 'Orders').click();
        cy.get('.securities-tab table tbody tr').first().within(() => {
            cy.get('.button-primary').contains('Sell').click();
        });
        cy.get('.popup').should('be.visible');
        cy.get('.popup .popup-buttons .button-wrapper:nth-child(2) button').click();
        cy.get('.popup-container').should('be.visible').and('contain.text', 'Invalid input values');
    })
});