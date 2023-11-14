require("dotenv").config();

import express from "express";
import config from "config";

const app = express();

app.use(express.json());

import db from "../config/db";

import Logger from "../config/logger";

import routerMovies from "./routes/movie.routes";

import morganMiddleware from "./middleware/morganMiddleware";

app.use(morganMiddleware);

app.use("/api", routerMovies);

const port = config.get<number>("port")

app.listen(port, async ()=>{
    await db();

    Logger.info("servidor rodando!");
});
