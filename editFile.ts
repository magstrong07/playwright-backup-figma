import { promises as fs } from "fs";

async function editFile() {
  await fs
    .readFile("data/fileUrl.json", "utf8")
    .then((data) => {
      let json = data.slice(0, -1);
      fs.writeFile("data/fileUrl.json", `[${json}]`)
        .then(() => {
          console.log("Update json Success");
        })
        .catch((err) => {
          console.log("Update Failed: " + err);
        });
    })
    .catch((err) => {
      console.log("Read Error: " + err);
    });
}
export default editFile;
