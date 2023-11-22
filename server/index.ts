import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import { apiRouter } from "./routes";
import { NextFunction, Request, Response } from "express";
import { ServerError } from "./types";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

app.use("/api", apiRouter);
app.all("*", (req:Request, res:Response, next:NextFunction) => {
  const err = new Error() as ServerError;
  err.status = "Route not found";
  err.statusCode = 404;
  next(err);
})

app.use((error: ServerError, req: Request, res: Response, next: NextFunction) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
