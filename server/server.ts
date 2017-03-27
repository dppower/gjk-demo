"use strict";

import * as express from "express";
import * as http from "http";
import * as path from "path";
import * as fs from "fs";
import * as bodyParser from "body-parser";

const app = express();

app.use(express.static(path.join(__dirname, "..")));
app.use("/scripts", express.static(path.join(__dirname, "..", "..", "node_modules")));
app.use("/styles", express.static(path.join(__dirname, "..", "..", "docs")));

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());

app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "index.html"));
});

const server = http.createServer(app);

server.listen(app.get("port"), () => {
    console.log(`Example app is listening on port ${app.get("port")}.`);
    console.log(`Script base url: ${__dirname}.`);
});