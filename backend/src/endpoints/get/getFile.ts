var fs = require("fs");

import { appRoot } from "../../global";

const byteCheck = (data: any, bytes: any[]) => {
  for (let i = 0; i < bytes.length; i++) {
    if (data[i] !== bytes[i]) {
      return false;
    }
  }
  return true;
};

export const getFile = (app: any) => {
  app.get("/getFile", async (req: any, res: any, next: any) => {
    const root = req.query.mode === "internal"? appRoot() : '';
    const data = fs.readFileSync(root + req.query.path);
    let fileInfo = { type: "unknown", data: data.toString() };
    try {
      res.json(fileInfo);
    } catch (error) {
      console.log(console.error());
      res.json({ status: "error", message: console.error() });
      next(error);
    }
  });
};
