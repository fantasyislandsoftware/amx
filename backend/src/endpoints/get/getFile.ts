var fs = require("fs");

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
    const data = fs.readFileSync("/home/node/app" + req.query.path);
    let fileInfo = { type: "unknown", data: data.toString() };
    if (byteCheck(data, [0x2f, 0x2f, 0x40, 0x41, 0x4d, 0x58, 0x4a, 0x53])) {
      fileInfo.type = "amxjs";
    }
    try {
      res.json(fileInfo);
    } catch (error) {
      console.log(console.error());
      res.json({ status: "error", message: console.error() });
      next(error);
    }
  });
};
