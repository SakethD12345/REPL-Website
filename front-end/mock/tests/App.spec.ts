import { test, expect } from '@playwright/test';


/**
 * This sets up the url for each test
 */
test.beforeEach(async ({ page }, testInfo) => {
  await page.goto("http://localhost:8000/");
  });

  /**
   * This test loads the first filepath with a header
   */
test('load a simple file with a header', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file RealFilePath1 with_header mock');
  await page.getByRole("button").click();

  const mock_input = `Loaded file RealFilePath1 successfully`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);
});

/**
 * This test loads the second filepath that doesn't have a header
 */
test('load a simple file without a header', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file RealFilePath2 without_header mock');
  await page.getByRole("button").click();

  const mock_input = `Loaded file RealFilePath2 successfully`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);
});

/**
 * This test loads a filepath that doesn't exist
 */
test('load a non existent file', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file NotAFilePath without_header mock');
  await page.getByRole("button").click();

  const mock_input = `File NotAFilePath not found`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);
});

/**
 * This test loads a file with a header and views it
 */
test('load a simple file with a header and viewing it', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file RealFilePath1 with_header mock');
  await page.getByRole("button").click();

  const mock_input = `Loaded file RealFilePath1 successfully`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('view');
  await page.getByRole("button").click();

  const mock_input2 = `Obama`
  await expect(page.getByLabel("Command history")).toContainText(mock_input2);
});

/**
 * This test loads the second file that doesn't have a header and views it
 */
test('load a simple file without a header and viewing it', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file RealFilePath2 without_header mock');
  await page.getByRole("button").click();

  const mock_input = `Loaded file RealFilePath2 successfully`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('view');
  await page.getByRole("button").click();

  const mock_input2 = `OMAC`
  await expect(page.getByLabel("Command history")).toContainText(mock_input2);
});

/**
 * This test loads a file with one column
 */
test('load a file with one column', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file FilePathOneColumn without_header mock');
  await page.getByRole("button").click();

  const mock_input = `Loaded file FilePathOneColumn successfully`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('view');
  await page.getByRole("button").click();

  const mock_input2 = `First`
  const mock_input3 = `Second`
  const mock_input4 = `Third`
  const mock_input5 = `Fourth`
  const mock_input6 = `Fifth`
  await expect(page.getByLabel("Command history")).toContainText(mock_input2);
  await expect(page.getByLabel("Command history")).toContainText(mock_input3);
  await expect(page.getByLabel("Command history")).toContainText(mock_input4);
  await expect(page.getByLabel("Command history")).toContainText(mock_input5);
  await expect(page.getByLabel("Command history")).toContainText(mock_input6);
});

/**
 * This test oads and empty file and tries searching and viewing the empty file
 */
test('load a file that is empty and viewing and searching it', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file FilePathEmpty without_header mock');
  await page.getByRole("button").click();

  const mock_input = `Loaded file FilePathEmpty successfully`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('view');
  await page.getByRole("button").click();

  const mock_input2 = `You are viewing an empty file`
  await expect(page.getByLabel("Command history")).toContainText(mock_input2);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search jack');
  await page.getByRole("button").click();

  const mock_input3 = `You are viewing an empty file`
  await expect(page.getByLabel("Command history")).toContainText(mock_input3);
});

/**
 * This test loads a file views it and then loads and views a different fike
 */
test('load a file viewing it and then loading a new file and viewing it', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file RealFilePath1 with_header mock');
  await page.getByRole("button").click();

  const mock_input = `Loaded file RealFilePath1 successfully`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('view mock');
  await page.getByRole("button").click();

  const mock_input2 = `Saketh`
  await expect(page.getByLabel("Command history")).toContainText(mock_input2);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file RealFilePath2 without_header mock');
  await page.getByRole("button").click();

  const mock_input3 = `Loaded file RealFilePath1 successfully`
  await expect(page.getByLabel("Command history")).toContainText(mock_input3);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('view mock');
  await page.getByRole("button").click();

  const mock_input4 = `Ratty`
  await expect(page.getByLabel("Command history")).toContainText(mock_input3);
});

/**
 * This test loads a file searchs it then loads a new file and searchs that
 */
test('load a file search it and then loading a new file and searching it', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file RealFilePath1 with_header mock');
  await page.getByRole("button").click();

  const mock_input = `Loaded file RealFilePath1 successfully`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search Age jack mock');
  await page.getByRole("button").click();

  const mock_input2 = `19`
  await expect(page.getByLabel("Command history")).toContainText(mock_input2);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file RealFilePath2 without_header mock');
  await page.getByRole("button").click();

  const mock_input3 = `Loaded file RealFilePath1 successfully`
  await expect(page.getByLabel("Command history")).toContainText(mock_input3);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search Ratty mock');
  await page.getByRole("button").click();

  const mock_input4 = `Ratty`
  await expect(page.getByLabel("Command history")).toContainText(mock_input3);
});

/**
 * This test tries viewing a file before loading it
 */
test('view a file before loading', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('view mock');
  await page.getByRole("button").click();

  const mock_input = `Please load a file before viewing it`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);
});

/**
 * This test tries searching a file before loading it
 */
test('search a file before loading', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search Names saketh mock');
  await page.getByRole("button").click();

  const mock_input = `Please load a file before searching it`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);
});

/**
 * This test searches an identical file with and without a headers
 */
test('search a file with and without header', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file RealFilePath1 with_header mock');
  await page.getByRole("button").click();

  const mock_input = `Loaded file RealFilePath1 successfully`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search Age 19 mock');
  await page.getByRole("button").click();

  const mock_input2 = `19`
  await expect(page.getByLabel("Command history")).toContainText(mock_input2);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file RealFilePath1WithoutHeader without_header mock');
  await page.getByRole("button").click();

  const mock_input3 = `Loaded file RealFilePath1WithoutHeader successfully mock`
  await expect(page.getByLabel("Command history")).toContainText(mock_input3);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search 19 mock');
  await page.getByRole("button").click();

  const mock_input4 = `19`
  await expect(page.getByLabel("Command history")).toContainText(mock_input4);
});

/**
 * This test tries searching a file with no header with a specified column
 */
test('search a file with a column but no header', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file RealFilePath1WithoutHeader without_header mock');
  await page.getByRole("button").click();

  const mock_input = `Loaded file RealFilePath1WithoutHeader successfully`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search Age 19');
  await page.getByRole("button").click();

  const mock_input2 = `Cannot search with a specified column on a file with no header`
  await expect(page.getByLabel("Command history")).toContainText(mock_input2);
});

/**
 * This test uses a column name and index to search
 */
test('search a file with a column name and column index', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file RealFilePath1 with_header mock');
  await page.getByRole("button").click();

  const mock_input = `Loaded file RealFilePath1 successfully`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search Age 19 mock');
  await page.getByRole("button").click();

  const mock_input2 = `Jack`
  await expect(page.getByLabel("Command history")).toContainText(mock_input2);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search 0 Jack mock');
  await page.getByRole("button").click();

  const mock_input3 = `Jack`
  await expect(page.getByLabel("Command history")).toContainText(mock_input3);
});

/**
 * This test tries searching a file with out of bounds indices
 */
test('search a file with invalid column indexes', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file RealFilePath1 with_header mock');
  await page.getByRole("button").click();

  const mock_input = `Loaded file RealFilePath1 successfully`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search -1 19');
  await page.getByRole("button").click();

  const mock_input2 = `The specified column is not present`
  await expect(page.getByLabel("Command history")).toContainText(mock_input2);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search 10 Jack mock');
  await page.getByRole("button").click();

  const mock_input3 = `The specified column is not present`
  await expect(page.getByLabel("Command history")).toContainText(mock_input3);
});

/**
 * This test loads and views a file with a weird shape
 */
test('load and view a file with a weird shape', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file FilePathWeirdShape without_header mock');
  await page.getByRole("button").click();

  const mock_input = `Loaded file FilePathWeirdShape successfully`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('view');
  await page.getByRole("button").click();

  const mock_input2 = `Four`
  await expect(page.getByLabel("Command history")).toContainText(mock_input2);
});

/**
 * This test loads a file with a header and then switches the mode and loads a file without a header
 */
test('load switch mode ane then reload', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file RealFilePath1 with_header mock');
  await page.getByRole("button").click();

  const mock_input = `Loaded file RealFilePath1 successfully`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('mode');
  await page.getByRole("button").click();

  const mock_input2 = `Command: mode Output: Successfully switched to verbose mode`
  await expect(page.getByLabel("Command history")).toContainText(mock_input2);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file RealFilePath2 without_header mock');
  await page.getByRole("button").click();

  const mock_input3 = `Command: load_file RealFilePath2 without_header Output: Loaded file RealFilePath2 successfully`
  await expect(page.getByLabel("Command history")).toContainText(mock_input3);
});

/**
 * This test loads and views a file with a header then switches the mode and views it again
 */
test('load then view then switch mode then review', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file RealFilePath1 with_header mock');
  await page.getByRole("button").click();

  const mock_input = `Loaded file RealFilePath1 successfully`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('view');
  await page.getByRole("button").click();

  const mock_input2 = `Jack`
  await expect(page.getByLabel("Command history")).toContainText(mock_input2);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('mode');
  await page.getByRole("button").click();

  const mock_input3 = `Command: mode Output: Successfully switched to verbose mode`
  await expect(page.getByLabel("Command history")).toContainText(mock_input3);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('view mock');
  await page.getByRole("button").click();

  const mock_input4 = `Command: view Output: Names`
  await expect(page.getByLabel("Command history")).toContainText(mock_input4);
});

/**
 * This test loads switches mode and researches a file with the same search
 */
test('load then search then switch mode then search', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file RealFilePath1 with_header mock');
  await page.getByRole("button").click();

  const mock_input = `Loaded file RealFilePath1 successfully`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search Jack mock');
  await page.getByRole("button").click();

  const mock_input2 = `Jack`
  await expect(page.getByLabel("Command history")).toContainText(mock_input2);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('mode');
  await page.getByRole("button").click();

  const mock_input3 = `Command: mode Output: Successfully switched to verbose mode`
  await expect(page.getByLabel("Command history")).toContainText(mock_input3);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search Jack mock');
  await page.getByRole("button").click();

  const mock_input4 = `Command: search Jack Output: Names`
  await expect(page.getByLabel("Command history")).toContainText(mock_input4);
});

/**
 * This test switches the mode multiple times
 */
test('switching mode back and forth', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('mode');
  await page.getByRole("button").click();

  const mock_input = `Command: mode Output: Successfully switched to verbose mode`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('mode');
  await page.getByRole("button").click();

  const mock_input2 = `Successfully switched to brief mode`
  await expect(page.getByLabel("Command history")).toContainText(mock_input2);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('mode');
  await page.getByRole("button").click();

  const mock_input3 = `Command: mode Output: Successfully switched to verbose mode`
  await expect(page.getByLabel("Command history")).toContainText(mock_input3);
});

/**
 * This test checks for proper error handling with incorrect commands given
 */
test('Typos and wrong commands', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file RealFilePath1 mock');
  await page.getByRole("button").click();

  const mock_input = `Please enter a valid command`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load RealFilePath1 with header mock');
  await page.getByRole("button").click();

  const mock_input2 = `Please enter a valid command`
  await expect(page.getByLabel("Command history")).toContainText(mock_input2);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('view file');
  await page.getByRole("button").click();

  const mock_input3 = `Please enter a valid command`
  await expect(page.getByLabel("Command history")).toContainText(mock_input3);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search file');
  await page.getByRole("button").click();

  const mock_input4 = `Please enter a valid command`
  await expect(page.getByLabel("Command history")).toContainText(mock_input4);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('switch mode');
  await page.getByRole("button").click();

  const mock_input5 = `Please enter a valid command`
  await expect(page.getByLabel("Command history")).toContainText(mock_input5);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file RealFilePath1 with header');
  await page.getByRole("button").click();

  const mock_input6 = `Please enter a valid command`
  await expect(page.getByLabel("Command history")).toContainText(mock_input6);
});

/**
 * This test loads, views, and searches a file that only has one row in it
 */
test('Viewing and searching a file with one row and no header', async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file FilePathOneRow without_header mock');
  await page.getByRole("button").click();

  const mock_input = `Loaded file FilePathOneRow successfully`
  await expect(page.getByLabel("Command history")).toContainText(mock_input);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('view mock');
  await page.getByRole("button").click();

  const mock_input2 = `Mahomes`
  await expect(page.getByLabel("Command history")).toContainText(mock_input2);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search Wilson mock');
  await page.getByRole("button").click();
});

