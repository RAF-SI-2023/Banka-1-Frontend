// import { test, expect } from '@playwright/test';

// test.skip('test', async ({ page }) => {
//     await page.goto('http://localhost:4200/');
//     await page.goto('http://localhost:4200/login');
//     await page.getByLabel('Email').click();
//     await page.getByLabel('Email').fill('donnie@gmail.com');
//     await page.locator('input[type="password"]').click();
//     await page.locator('input[type="password"]').press('CapsLock');
//     await page.locator('input[type="password"]').fill('A');
//     await page.locator('input[type="password"]').press('CapsLock');
//     await page.locator('input[type="password"]').fill('Azoff.1');
//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.getByRole('button', { name: 'OK' }).click();
//     await page.getByText('Employee').click();
//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.getByText('Orders').click();
//     await page.getByText('Securities').first().click();
//     await page.locator('app-security-list div').filter({ hasText: 'Stock Future Forex' }).nth(2).click({
//         button: 'middle'
//     });
//     // await page.$('tr[data-testid="row"]').then(row => row.$('button')).then(button => button.click());
//     //await page.getByRole('row', { name: 'WYY Widepoint C NYSE MKT LLC' }).getByRole('button').click();
//     await page.getByRole('button', { name: 'Detail' }).first().click();
//     await page.getByRole('button', { name: 'Detail' }).first().click();

//     await page.getByRole('button', { name: 'Buy' }).click();
//     await page.locator('div').filter({ hasText: /^Amount:$/ }).getByPlaceholder('value...').fill('1');
//     await page.getByRole('checkbox').check();
//     await page.getByRole('button', { name: 'Buy' }).click();
//     await expect(page.getByText('Buy order has been placed')).toBeVisible();
//     await page.getByRole('button', { name: 'OK' }).click();
//     await page.getByRole('button', { name: 'Buy' }).click();
//     await page.locator('div').filter({ hasText: /^Amount:$/ }).getByPlaceholder('value...').click();
//     await page.locator('div').filter({ hasText: /^Amount:$/ }).getByPlaceholder('value...').fill('1');
//     await page.getByRole('button', { name: 'Buy' }).click();
//     await page.getByRole('button', { name: 'OK' }).click();
//     await page.getByText('Securities').click();
//     await page.getByText('Forex').click();
//     await page.getByRole('row', { name: 'EUR/JPY Oanda EUR/JPY OANDA:' }).getByRole('button').click();
//     await page.getByRole('button', { name: 'Buy' }).click();
//     await page.locator('div').filter({ hasText: /^Amount:$/ }).getByPlaceholder('value...').fill('10');
//     await page.getByRole('button', { name: 'Buy' }).click();
//     await page.getByRole('button', { name: 'OK' }).click();
//     await page.getByText('Securities').click();
//     await page.getByRole('row', { name: 'ORCL Oracle Corporation NEW' }).getByRole('button').click();
//     await page.getByRole('button', { name: 'Buy' }).click();
//     await page.locator('div').filter({ hasText: /^Amount:$/ }).getByPlaceholder('value...').click();
//     await page.locator('div').filter({ hasText: /^Amount:$/ }).getByPlaceholder('value...').fill('40');
//     await page.getByRole('button', { name: 'Buy' }).click();
//     await page.getByRole('button', { name: 'OK' }).click();
// });