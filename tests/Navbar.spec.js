import { test, expect } from "@playwright/test";
import { exec } from 'child_process';

test.setTimeout(60000);

test.beforeAll(async () => {
    // Start the server
    exec('npm start');
  
    // Optionally wait for server to be ready
    await new Promise(r => setTimeout(r, 10000)); // Wait 10 seconds
  });

test("test", async ({ page }) => {
   await page.goto("http://localhost:3000/");
   await expect(page).toHaveTitle("Logiin");
});