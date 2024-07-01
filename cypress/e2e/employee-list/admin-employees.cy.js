describe('check number of employees for admin user', () => {
    it('logged in as admin and 4 employees are displayed', () => {
        cy.visit('http://localhost/login');
        cy.contains('Employee').click();
        cy.get('label').contains('Email').click();
        cy.get('label').contains('Email').siblings('input').type('admin');
        cy.get('input[type="password"]').click().type('admin');
        cy.get('button').contains('Login').click();
        cy.contains('div', 'Employee panel').first().click();
        cy.get('.tabs-content app-dynamic-table tbody tr').should('have.length', 0);
    })
});
