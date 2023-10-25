import { test, expect } from "@playwright/test";

//Testing the functionality of the frontend of our site

test("on page load, I see an input bar", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto("http://localhost:8000/");

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, I see a Submit button", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
});

test("on page load, I see a Brief/Verbose button", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await expect(page.getByRole("button", { name: "Brief" })).toBeVisible();
});

test("after I click Brief/Verbose button, it switches", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await expect(page.getByRole("button", { name: "Brief" })).toBeVisible();
  await page.getByRole("button", { name: "Brief" }).click();
  await expect(page.getByRole("button", { name: "Verbose" })).toBeVisible();
  await page.getByRole("button", { name: "Verbose" }).click();
  await expect(page.getByRole("button", { name: "Brief" })).toBeVisible();
});

test("loads mock csv properly", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  //Brief mode test
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file roster");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("File successfully loaded.")).toBeVisible();

  //Verbose mode test
  await page.getByRole("button", { name: "Brief" }).click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file roster");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("File successfully loaded.")).toBeVisible();
  await expect(page.getByText("Command: load_file roster")).toBeVisible();
  await expect(
    page.getByText("Output: roster successfully loaded")
  ).toBeVisible();
});

test("returns error message when load called with invalid argument", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  //wrong file name
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file nonexistent_file");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("File not found!")).toBeVisible();

  //no input file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("File not found!").nth(1)).toBeVisible();
});

test("changing file and testing view", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  //initial file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file roster");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("File successfully loaded.")).toBeVisible();

  //checking that the file contains
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("CS32,Matt,19")).toBeVisible();

  //loading different file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file people");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("File successfully loaded.").nth(1)
  ).toBeVisible();

  //checking that the file contains
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Alice,5.2,blue,20")).toBeVisible();
});

test("viewing without loading", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("No file loaded!")).toBeVisible();
});

test("testing basic functionality of search", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  //initial file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file people");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("File successfully loaded.")).toBeVisible();

  //searching file with specified specified column name
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Name Steve");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Steve,7'0,hazel,40")).toBeVisible();

  //searching file with specified specified column number
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 Steve");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Steve,7'0,hazel,40").nth(1)).toBeVisible();
});

test("testing erroneous searches", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  //initial file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file people");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("File successfully loaded.")).toBeVisible();

  //searching file with specified specified column name
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Name Steven");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("No matches found")).toBeVisible();
});
