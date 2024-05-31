// import { test, expect } from '@playwright/test';

// test.skip('test', async ({ page }) => {
//     await page.goto('http://localhost:4200/');
//     await page.goto('http://localhost:4200/login');
//     await page.getByText('Employee').click();
//     await page.getByLabel('Email').click();
//     await page.getByLabel('Email').fill('admin');
//     await page.locator('input[type="password"]').click();
//     await page.locator('input[type="password"]').fill('user1');
//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.getByText('Securities').click();
//     await page.getByRole('row', { name: 'AMZN Amazon.com Inc.' }).getByRole('button').click();
//     await page.getByRole('button', { name: 'Buy' }).click();
//     await page.locator('div').filter({ hasText: /^Amount:$/ }).getByPlaceholder('value...').click();
//     await page.locator('div').filter({ hasText: /^Amount:$/ }).getByPlaceholder('value...').fill('3');
//     await page.locator('div').filter({ hasText: /^Limit value:$/ }).getByPlaceholder('value...').click();
//     await page.locator('div').filter({ hasText: /^Limit value:$/ }).getByPlaceholder('value...').fill('200');
//     await page.locator('div').filter({ hasText: /^Stop value:$/ }).getByPlaceholder('value...').click();
//     await page.locator('div').filter({ hasText: /^Stop value:$/ }).getByPlaceholder('value...').fill('100');
//     await page.getByRole('checkbox').check();
//     await page.getByRole('button', { name: 'Buy' }).click();
//     await page.getByRole('button', { name: 'OK' }).click();
// });