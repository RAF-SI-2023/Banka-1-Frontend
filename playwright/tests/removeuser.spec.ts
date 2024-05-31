import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.goto('http://localhost:4200/login');
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('admin');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill('user1');
    await page.getByText('Employee').click();
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByText('Admin panel').click();
    await page.getByRole('row', { name: 'Client ClientPrezime client@' }).locator('#options-button').hover();
    await page.getByRole('button', { name: 'Delete' }).click();
});