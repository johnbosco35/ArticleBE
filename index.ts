/** @format */

import express, { Application } from "express";

import dotenv from "dotenv";
import appConfig from "./Main";
import { environmentVariable } from "./env/environmemt";
import { DBconnect } from "./Config/db";
dotenv.config();

const port: Number | any = process.env.port;

const app: Application = express();

appConfig(app);

const server = app.listen(environmentVariable.port, () => {
  console.log("Server is Active");
  DBconnect()
});

process.on("uncaughtException", (error: any) => {
  console.log(error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.log(reason);
  server.close(() => {
    process.exit(1);
  });
});
