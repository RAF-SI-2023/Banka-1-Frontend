// import { test, expect } from '@playwright/test';

// test.skip('test', async ({ page }) => {
//     await page.goto('http://localhost:4200/');
//     await page.goto('http://localhost:4200/login');
//     await page.getByLabel('Email').click();
//     await page.getByLabel('Email').fill('customer@gmail.com');
//     await page.getByLabel('Email').press('Tab');
//     await page.locator('input[type="password"]').fill('customer');
//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.getByRole('img').click();
//     await page.getByText('Exchange', { exact: true }).click();
//     await page.getByLabel('Outflow account number:').selectOption('usd');
//     await page.getByLabel('Inflow account number:').selectOption('eur');
//     await page.getByLabel('Amount:').click();
//     await page.getByLabel('Amount:').fill('1');
//     await page.getByRole('button', { name: 'Continue' }).click();
//     await page.getByRole('button', { name: 'Finish' }).click();
// });