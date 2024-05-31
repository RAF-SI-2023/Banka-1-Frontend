// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//     await page.goto('http://localhost:4200/');
//     await page.goto('http://localhost:4200/login');
//     await page.getByText('Employee').click();
//     await page.getByLabel('Email').click();
//     await page.getByLabel('Email').fill('admin');
//     await page.locator('input[type="password"]').click();
//     await page.locator('input[type="password"]').fill('user1');
//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.getByText('Admin panel').click();
//     await page.getByRole('row', { name: 'Donnie Azoff donnie@gmail.com' }).locator('#options-button').hover();
//     await page.getByRole('button', { name: 'Edit Profile' }).click();
//     await page.locator('#mat-mdc-dialog-0 #name').fill('Darko');
//     await page.getByLabel('Phone Number:').click();
//     await page.getByLabel('Phone Number:').fill('06123456789');
//     page.once('dialog', dialog => {
//         console.log(`Dialog message: ${dialog.message()}`);
//         dialog.dismiss().catch(() => { });
//     });
//     await page.getByRole('button', { name: 'Update' }).click();
//     await expect(page.getByRole('cell', { name: 'Darko Azoff' })).toBeVisible();
// });