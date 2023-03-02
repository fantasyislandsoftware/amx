var fs = require("fs");

export const getScript = (app: any) => {
  app.get("/getScript", async (req: any, res: any, next: any) => {
    console.log(req.query);
    try {
      const data = fs
        .readFileSync(`/home/node/app/src/amxScripts/${req.query.script}.js`)
        .toString()
        .split("\n")
        .map((item: string) => {
          return item.trimStart();
        });

      res.json({ data: data });
    } catch (error) {
      console.log(console.error());
      res.json({ status: "error", message: console.error() });
      next(error);
    }
  });
};
