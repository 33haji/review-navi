import * as http from "http";
import { app } from "../app";
import * as cfenv from 'cfenv';

// get the app environment from Cloud Foundry
const appEnv = cfenv.getAppEnv();
// const port = 4300;
const port = appEnv.port || 4300;
app.set("port", port);

const server = http.createServer(app);

server.listen(port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on port:" + port);
});
