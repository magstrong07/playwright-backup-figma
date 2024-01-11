import { test, expect } from "@playwright/test";
import { promises as fs } from "fs";
import projectsMassive from "../data/fileUrl.json";

test.describe("download", async () => {
  for (const chto of projectsMassive) {
    let links = chto.files;
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

          await download.saveAs(
            `./backups/${chto.name}/` + download.suggestedFilename()
          );
        } catch (e) {
          const url = page.url();
          await fs.appendFile(
            `./backups/${chto.name}/` + `${links[index].name}.txt`,
            "файл нельзя скачать:" + "\n" + url + "\n \n"
          );
          await fs.appendFile("fail_download.txt", "\n" + url + "\n \n");
        }
      });
    }
  }
});
