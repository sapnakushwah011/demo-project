import { test, expect } from '@playwright/test';

// test("sample test", async({ page }) => {

//     await page.goto('https://ross-ofr.techcarrel.in/');
//     await page.pause();
//     await page.getByPlaceholder('Username').fill('rahulphalke123@gmail.com');
//     await page.getByPlaceholder('Password').fill('Mighty@1234');
//     await page.getByRole('button', { name: 'Submit' }).click();
//     await page.getByTestId('ArrowDropDownIcon').click();
//     await page('menuitem', { name: 'Logout' }).click();
   
// });

test("sample test failing", ({ page }) => {
    test.fail();

})