import * as express from "express";
import * as path from "path";
import { json, urlencoded } from "body-parser";
import * as compression from "compression";

import { apiRouter } from "./routes/api";

const app: express.Application = express();
app.disable("x-powered-by");

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));

app.use(express.static(path.join("dist/client")));

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

export { app };
