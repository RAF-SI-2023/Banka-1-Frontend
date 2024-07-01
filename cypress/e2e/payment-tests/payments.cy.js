describe('login test', () => {
    it('should login as employee', () => {
        cy.visit('http://localhost/login');
        cy.contains('Employee').click();
        cy.get('label').contains('Email').click();
        cy.get('label').contains('Email').siblings('input').type('donnie@gmail.com');
        cy.get('input[type="password"]').click().type('Azoff.1');
        cy.get('button').contains('Login').click();
        cy.contains('div', /^Securities$/).first().click();
    }),
        it('should login as customer and create new empty payment which is invalid', () => {
            cy.visit('http://localhost/login');
            cy.get('label').contains('Email').click();
            cy.get('label').contains('Email').siblings('input').type('customer@gmail.com');
            cy.get('input[type="password"]').click().type('customer1');
            cy.get('button').contains('Login').click();
            cy.contains('div', 'Bank accounts').first().click();
            cy.get('button').contains('New payment').click();
            cy.get('button').contains('Submit').click();
            cy.wait(3000);
            cy.get('.popup-container').should('be.visible').and('contain.text', 'Forma nije validna');
        }),
        it('should login as customer and create new payment which is invalid', () => {
            cy.visit('http://localhost/login');
            cy.get('label').contains('Email').click();
            cy.get('label').contains('Email').siblings('input').type('customer@gmail.com');
            cy.get('input[type="password"]').click().type('customer1');
            cy.get('button').contains('Login').click();
            cy.contains('div', 'Bank accounts').first().click();
            cy.get('button').contains('New payment').click();
            cy.get('input[name="recipientName"]').type('TEST');
            cy.get('input[name="paymentCode"]').type('TEST');
            cy.get('input[name="recipientAccountNumber"]').type('TEST');
            cy.get('button').contains('Submit').click();
            cy.wait(3000);
            cy.get('.popup-container').should('be.visible').and('contain.text', 'Forma nije validna');
        }),
        it('should login as customer and add new recipient', () => {
            cy.visit('http://localhost/login');
            cy.get('label').contains('Email').click();
            cy.get('label').contains('Email').siblings('input').type('customer@gmail.com');
            cy.get('input[type="password"]').click().type('customer1');
            cy.get('button').contains('Login').click();
            cy.contains('div', 'Payments').first().click();
            cy.wait(1000);
            cy.get('div').contains('Recipients').click();
            cy.get('button').contains('Add recipient').click();
            cy.get('input[name="name"]').type('TEST TEST');
            cy.get('input[name="number"]').type('1234567');
            cy.get('button').contains('Apply').click();
            cy.get('.transactions-table tbody tr').should('have.length', 1);
        });
});