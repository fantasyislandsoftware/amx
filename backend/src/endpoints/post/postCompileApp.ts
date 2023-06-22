var execSync = require("child_process").execSync;

export const postCompileApps = (app: any) => {
  app.post("/compileApps", async (req: any, res: any, next: any) => {
    try {
      let sourceList: any = [{ name: "test" }];

      sourceList.map((item: any) => {
        const result = execSync(
          `cd /home/node/app/data/hd/System/source/${item.name} && vasm.sh ${item.name}.asm`
        );
        item["status"] = result.toString();
      });

      res.json({ data: sourceList });
    } catch (error) {
      console.log(console.error());
      res.json({ status: "error", message: console.error() });
      next(error);
    }
  });
};
