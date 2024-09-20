import axios from "axios";
import { promises as fs } from "fs";
import { ids } from "./projectsData/ids";
import editFile from "./editFile";
import { styleText } from "node:util";

function getFiles() {
  for (const index in ids) {
    const url = ids[index];
    axios
      .get(`https://api.figma.com/v1/projects/${url}/files`, {
        headers: {
          "Token": "token",
        },
      })
      .then(function (response) {
        const greenText = styleText('green',`${response.data.name} --- ${response.data.files.length} files`);
        console.log(greenText);
        (response: any) => response.data.json();

        fs.appendFile(`data/fileUrl.json`, `${JSON.stringify(response.data)},`);

        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}

getFiles();
setTimeout(() => {
  editFile();
}, 5000);
