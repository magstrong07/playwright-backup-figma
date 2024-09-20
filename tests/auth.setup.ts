import { test as setup } from "@playwright/test";

const authFile = "playwright\\.auth\\user.json";

setup("authenticate", async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("https://www.figma.com/");
  await page.getByRole("link", { name: "Log in" }).click();
  await page
    .frameLocator('iframe[title="Auth"]')
    .getByPlaceholder("Password")
    .fill("");
  await page
    .frameLocator('iframe[title="Auth"]')
    .getByPlaceholder("Email")
    .fill("");
  await page
    .frameLocator('iframe[title="Auth"]')
    .getByRole("button", { name: "Log in" })
    .click();
  await page.waitForTimeout(5000);

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
