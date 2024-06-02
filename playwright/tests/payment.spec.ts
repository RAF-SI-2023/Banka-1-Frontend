// import { test, expect } from '@playwright/test';
// // import {MailListener} from 'mail-listener2';

// test('test', async ({ page }) => {
//     await page.goto('http://localhost:4200/');
//     await page.goto('http://localhost:4200/login');
//     await page.getByLabel('Email').click();
//     await page.getByLabel('Email').fill('banka1korisnik@gmail.com');
//     await page.locator('input[type="password"]').click();
//     await page.locator('input[type="password"]').fill('customer');
//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.getByText('Bank accounts').click();
//     await page.getByRole('button', { name: 'New payment' }).click();
//     await page.getByLabel('Account number:', { exact: true }).selectOption('131242055574335372');
//     await page.getByLabel('Recipient Name:').click();
//     await page.getByLabel('Recipient Name:').fill('test');
//     await page.getByLabel('Payment code:').click();
//     await page.getByLabel('Payment code:').fill('test');
//     await page.getByLabel('Recipient Account Number:').click();
//     await page.getByLabel('Recipient Account Number:').fill('usd');
//     await page.getByLabel('Purpose of payment:').click();
//     await page.getByLabel('Purpose of payment:').fill('payment');
//     await page.getByLabel('Amount:').click();
//     await page.getByLabel('Amount:').fill('10');
//     await page.getByLabel('Reference number:').click();
//     await page.getByLabel('Reference number:').fill('123');
//     await page.getByRole('button', { name: 'Submit' }).click();

//     var { MailListener } = require("mail-listener5");

//     var mailListener = new MailListener({
//         username: "banka1korisnik@gmail.com",
//         password: "cfrg qevy qykp kqsd", // works for me: https://accounts.google.com/b/0/IssuedAuthSubTokens?hide_authsub=1
//         host: "imap.gmail.com",
//         port: 993, // imap port
//         tls: true,
//         fetchUnreadOnStart: true //,
//     });

//     mailListener.start();
//     var emailText = '';
//     mailListener.on("mail", function (mail, seqno, attributes) {
//         console.log('email received');
//         emailText = mail.text;
//         console.log(emailText);
//     });

//     while (emailText == '') {

//     }

//     await page.getByPlaceholder('one-time password').click();
//     await page.getByPlaceholder('one-time password').fill(emailText);
//     await page.getByRole('button', { name: 'Apply' }).click();
//     await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
// });