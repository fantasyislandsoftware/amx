import { opendirSync, readFileSync } from "fs";

import { icon2Png } from "../../lib/amigaIconConverter/png";
var PNG = require("pngjs").PNG;
import { isDir, parseInfoFile } from "../../lib/fileManagement";

export const getListDir = (app: any) => {
  app.get("/getListDir", async (req: any, res: any, next: any) => {
    const path = "/home/node/app/data/hd/System";

    try {
      /*const info = await parseInfoFile(
        "/home/node/app/data/hd/System/icons/drawer.info"
      );*/

      const info = {
        imageBuffer: readFileSync("/home/node/app/src/icons/test.png"),
      };

      /** **/

      let items: any = [];
      const dir: any = opendirSync(path);
      for await (const entry of dir) {
        items.push({
          name: entry.name,
          folder: isDir(`${path}/${entry.name}`),
          icon: info.imageBuffer.toString("base64"),
        });
      }

      res.json({ results: items });
    } catch (error) {
      console.log(console.error());
      res.json({ status: "error", message: console.error() });
      next(error);
    }
  });
};
