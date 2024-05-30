// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('http://localhost:4200/');
//   await page.goto('http://localhost:4200/login');
//   await page.getByLabel('Email').click();
//   await page.getByText('Employee').click();
//   await page.getByLabel('Email').click();
//   await page.getByLabel('Email').fill('admin');
//   await page.locator('input[type="password"]').click();
//   await page.locator('input[type="password"]').fill('user1');
//   await page.getByRole('button', { name: 'Login' }).click();
//   await page.getByText('Admin panel').click();
//   await page.getByText('Limits').click();
//   await page.getByRole('cell', { name: 'more_vert' }).click();
//   await page.getByRole('cell', { name: 'more_vert' }).click();
//   await page.getByRole('button', { name: 'Edit' }).click();
//   await page.getByLabel('New limit:').fill('25');
//   await page.getByRole('button', { name: 'Set new limit' }).click();
//   await page.getByRole('button', { name: 'OK' }).click();
//   await expect(page.getByRole('cell', { name: '25' })).toBeVisible();
// });