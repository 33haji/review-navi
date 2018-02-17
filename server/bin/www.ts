import * as http from "http";
import { app } from "../app";
import * as cfenv from 'cfenv';

// get the app environment from Cloud Foundry
const appEnv = cfenv.getAppEnv();
// const port = appEnv.port || 4300;
const port = 4300;
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
