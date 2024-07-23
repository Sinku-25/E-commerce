import express from "express";
import { connection } from "./DB/dbConnection.js";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { init } from "./src/modules/server.js";
import cors from 'cors';
dotenv.config();
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
  app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use(morgan("dev"));
init(app);
connection();
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`));

process.on("unhandledRejection", (err) => {
  console.log(err);
});
