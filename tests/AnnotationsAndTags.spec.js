import { test, expect } from "@playwright/test";

// test.only("runs this test only", async({ page }) => {
//     // test logic here
//   }); 

test.skip("test one", async({ page }) => {
  // test logic here
});

// test("Not yet ready", async({ page }) => {
//   test.fail();
//  });


test.fixme("test to be fixed", async({ page }) => {
  // test logic here
 });

test("slow test", async({ page }) => {
  test.slow();
  // test logic here
 });

//Tags:

test('Test login page @smoke', async({ page }) => {
  // test logic here
});
  