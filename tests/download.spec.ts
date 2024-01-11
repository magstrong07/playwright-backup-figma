import axios from "axios";
import { test, expect } from "@playwright/test";
import { promises as fs } from "fs";
// import  nameProject  from "../getFiles.js";
const links = [
];

test.describe("download", () => {
  for (const index in links) {
    const url = links[index].key;
    test(links[index].key, async ({ page }) => {
      test.setTimeout(1200000);

      await page.goto(`https://www.figma.com/file/${url}`);
      
      await page.locator("id=toggle-menu-button").click();
      await page.getByTestId("dropdown-option-File").click();

      try {
        const downloadPromise = page.waitForEvent("download");
        await page.getByTestId("dropdown-option-Save local copy…").click();
        const download = await downloadPromise;

        await download.saveAs(`./backups/` + download.suggestedFilename());
      } catch (e) {
        const url = page.url();

        await fs.appendFile("fail_download.txt", "\n" + url + "\n \n");
      }
    });
  }
});
