import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { application } from "./constants/appVariable";
import BaseRouter from "./routes/api";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
//configure application routes
//@GET - dummy api route
//@ts-ignore
app.use("/api", BaseRouter);
app.get('/api', (_req, res) => {
  res.json('hello world')
});
  
  const port: Number = Number(application.port) || 3000;
  const startServer = async () => {
    await app.listen(port, () => {
      console.log(`
  Server running on http://localhost:${port}
  `);
    });
  };

  startServer();