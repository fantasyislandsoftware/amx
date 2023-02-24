import express from "express";
import bodyParser from "body-parser";

var cors = require("cors");
const app = express();

// import { search } from "./endpoints/search";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// search(app);

const port = 12345;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
