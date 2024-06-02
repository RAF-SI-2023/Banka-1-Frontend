// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//     await page.goto('http://localhost:4200/');
//     await page.goto('http://localhost:4200/login');
//     await page.getByLabel('Email').click();
//     await page.getByLabel('Email').fill('banka1korisnik@gmail.com');
//     await page.locator('input[type="password"]').click();
//     await page.locator('input[type="password"]').fill('customer');
//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.getByRole('img').click();
//     await page.getByText('Recipients').click();
//     await page.getByRole('button', { name: 'Add recipient' }).click();
//     await page.getByLabel('Recipient Name:').press('CapsLock');
//     await page.getByLabel('Recipient Name:').fill('P');
//     await page.getByLabel('Recipient Name:').press('CapsLock');
//     await page.getByLabel('Recipient Name:').fill('Pera ');
//     await page.getByLabel('Recipient Name:').press('CapsLock');
//     await page.getByLabel('Recipient Name:').fill('Pera P');
//     await page.getByLabel('Recipient Name:').press('CapsLock');
//     await page.getByLabel('Recipient Name:').fill('Pera Peric');
//     await page.getByLabel('Recipient Account Number:').click();
//     await page.getByLabel('Recipient Account Number:').fill('usd');
//     await page.getByRole('button', { name: 'Apply' }).click();
//     await expect(page.getByRole('cell', { name: 'Pera Peric' })).toBeVisible();
// });