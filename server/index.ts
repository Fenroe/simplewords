import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import { apiRouter } from "./routes";

//For env File
dotenv.config({ path: `.env.local`, override: true });
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
