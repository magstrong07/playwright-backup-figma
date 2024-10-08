import { test } from "@playwright/test";
import { promises as fs } from "fs";
import projectsMassive from "../data/fileUrl.json";

test.describe("download", async () => {
  for (const data of projectsMassive) {
    let links = data.files;
    for (const index in links) {
      const url = links[index].key;
      test(links[index].key, async ({ page }) => {
        test.setTimeout(30 * 60 * 1000);

        await page.goto(`https://www.figma.com/design/${url}`);

        await page
          .locator("id=toggle-menu-button")
          .click({ timeout: 1 * 60 * 1000 });
        await page
          .getByTestId("dropdown-option-File")
          .click({ timeout: 1 * 60 * 1000 });

        try {
          const downloadPromise = page.waitForEvent("download");
          await page
            .getByTestId("dropdown-option-Save local copy…")
            .click({ timeout: 1 * 60 * 1000 });
          const download = await downloadPromise;

          await download.saveAs(
            `./backups2/${data.name}/` + download.suggestedFilename()
          );
        } catch (e) {
          const url = page.url();
          await fs.appendFile(
            `./backups2/${data.name}/` + `${links[index].name}.txt`,
            "файл нельзя скачать:" + "\n" + url + "\n \n"
          );
          await fs.appendFile("fail_download.txt", "\n" + url + "\n \n");
        }
      });
    }
  }
});
