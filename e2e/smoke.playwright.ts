import { expect, test } from "@playwright/test";

/**
 * Browser smoke test for Eka.
 *
 * The happy-dom suite in `tests/` covers the game logic and the React
 * components; these checks cover the browser only: bundle, mount, the SVG
 * table, one full guess, and the layout contract.
 *
 * Laptop viewport: 1366x768 minus browser chrome, the common reviewer size
 * and short enough to catch a layout that only fits a tall window.
 */

const LAPTOP = { width: 1280, height: 757 };

test("the game boots with a full periodic table", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.setViewportSize(LAPTOP);
  await page.goto("/");

  await expect(page.locator("#root")).not.toBeEmpty();
  await expect(page.getByRole("heading", { name: "Eka" })).toBeVisible();
  await expect(page).toHaveTitle(/Eka/);
  await expect(page.getByTestId("periodic-table")).toBeVisible();
  await expect(page.getByTestId("element")).toHaveCount(118);

  // An uncaught exception on load is a failure even if the markup looks fine.
  expect(pageErrors).toEqual([]);
});

test("a guess comes back with early/late feedback", async ({ page }) => {
  await page.setViewportSize(LAPTOP);
  await page.goto("/");

  await page.getByLabel("Guess year").fill("1800");
  await page.getByRole("button", { name: "Guess" }).click();

  await expect(page.locator(".feedback-text")).toHaveText(
    /\d+ years too (early|late)/,
  );
  await expect(page.getByText("3 guesses left")).toBeVisible();
});

test("the table fits the viewport width", async ({ page }) => {
  await page.setViewportSize(LAPTOP);
  await page.goto("/");

  const doc = await page.evaluate(() => {
    const el = document.scrollingElement;
    return {
      scrollWidth: el?.scrollWidth ?? 0,
      innerWidth: window.innerWidth,
    };
  });
  expect(doc.scrollWidth).toBeLessThanOrEqual(doc.innerWidth);

  const table = await page.getByTestId("periodic-table").boundingBox();
  if (!table) throw new Error("the table has no layout box");
  expect(table.width).toBeLessThanOrEqual(LAPTOP.width);
});
