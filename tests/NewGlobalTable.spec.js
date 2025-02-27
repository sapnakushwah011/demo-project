import { test, expect } from "@playwright/test";

let page;
let context;

test.describe("GlobalTable Component", () => {
  test.setTimeout(60000); // Set to 60 seconds

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    await page.goto("https://ross-ofr.techcarrel.in/");
    await page.getByPlaceholder("Username").fill("rahulphalke123@gmail.com");
    await page.getByPlaceholder("Password").fill("Mighty@1234");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page).toHaveURL("https://ross-ofr.techcarrel.in/dashboard");
    await page.getByRole("button", { name: "Go to Account Listings" }).click();
    await expect(page).toHaveURL("https://ross-ofr.techcarrel.in/accounts-listing");
  });

  // Clean up the context after all tests are finished
  test.afterAll(async () => {
    await context.close();
  });

  test.beforeEach(async () => {
    await page.reload();
  });

  // Initial rendering of the component
  test("should render Global Table with default props", async() => {
    const Table = await page.locator(".base-table");
    await expect(Table).toBeVisible();
  });

  // Should show search input box
  test("should show search bar if searchable is true", async() => {
    const searchInputBar = await page.getByPlaceholder("Search by keywords...");
    await expect(searchInputBar).toBeVisible();
  });

  //   // To show search result
  test("should search on button click only.", async() => {
    const searchInput = await page.getByPlaceholder("Search by keywords...");
    await searchInput.type("2021", { delay: 100 });
    await page.getByRole("button", { name: "Search" }).click();

    //Search result
    await page.getByRole("cell", { name: "Accountt Name testing" });
  });

  // show data on page change
  test("to render data on page change ", async() => {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await page.waitForTimeout(1000);
    await page.locator("button").filter({ hasText: /^2$/ }).click();
    await page.getByRole("cell", { name: "Abilene Thoughtbridge" });
  });

  test("should reset search and fetch all data", async() => {
    await page.fill('input[name="search"]', "test search");
    await page.click('button[type="submit"]');
    await page.click('button:has-text("Reset")');

    const searchInput = await page.locator('input[name="search"]');
    await expect(searchInput).toHaveValue("");
    await expect(page.locator("tbody tr")).toHaveCount(50);
  });

  test("should display no data found message when there are no results", async() => {
    const searchInput = await page.getByPlaceholder("Search by keywords...");
    await searchInput.type("test search", { delay: 100 });
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page.locator("text=No data found")).toBeVisible();
  });

  // on advanced filter .
  test("show show filter sidebar ", async() => {
    await page.getByRole("button", { name: "Advanced Filters" }).click();

    // If opened, should show "Account Name" section
    await page.locator("text=Account Name");

    // If opened, should show "Account status" section
    await page.locator("text=Account Status");
  });

  // Show show filter data
  test("should show filter data", async() => {
    await page.getByRole("button", { name: "Advanced Filters" }).click();
    await page.locator('input[id="Demo-account_name"]').click();

    await page.getByRole("option", { name: "Account ting" }).click();
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByRole("cell", { name: "Account ting" });
    // new commit added
    // reset data on clear filter
    await page.getByRole("button", { name: "Clear Filter" }).click();
    await expect(page.locator("tbody tr")).toHaveCount(50);
  });

  // For multiple value search
  test("should show filter data on multiple selection", async() => {
    await page.getByRole("button", { name: "Advanced Filters" }).click();
    await page.locator(".css-1n1n5qs-control").first().click();

    await page.getByRole("option", { name: "Active" }).click();
    await page.getByRole("option", { name: "Do not Contact" }).click();

    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.locator("tbody tr")).toHaveCount(50);
  });
});
