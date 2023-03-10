import express from "express";
import bodyParser from "body-parser";

var cors = require("cors");
const app = express();

import { getScript } from "./endpoints/get/getScript";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* GET */
getScript(app);

const port = 9001;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
