import * as express from "express";
import * as path from "path";
import { json, urlencoded } from "body-parser";
import * as compression from "compression";

import scrapingApiRouter from "./routes/api/scraping";
import rakutenApiRouter from "./routes/api/rakuten";
import twitterApiRouter from "./routes/api/twitter";
import youtubeApiRouter from "./routes/api/youtube";

const app: express.Application = express();
app.disable("x-powered-by");

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));

app.use(express.static(path.join("dist/client")));

// expressのルーティング
// API
app.use("/api/scraping", scrapingApiRouter);
app.use("/api/rakuten", rakutenApiRouter);
app.use("/api/twitter", twitterApiRouter);
app.use("/api/youtube", youtubeApiRouter);

// Angularのルーティング
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

export { app };
