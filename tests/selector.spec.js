// import { test, expect } from '@playwright/test';

// test("Selectors Demo", async({page}) => {

//     await page.goto("https://www.saucedemo.com/");
//     await page.pause();
    
//     //using any object property
//     await page.click('id=user-name');
//     await page.locator('id=user-name').fill('sapna');
//     await page.locator('[id="user-name"]').fill('kushwah');

//     //using CSS selector
//     //#login-button
//     await page.locator('#login-button').click();

//     //Using XPath
//     await page.locator('input[id="user-name"]').fill('Tom');
//     await page.locator('input[id="user-name"]').fill('Martin');

//     //Using text
//     await page.locator('text=LOGIN').click();
//     await page.locator('input:has-text("LOGIN")').click();

// });