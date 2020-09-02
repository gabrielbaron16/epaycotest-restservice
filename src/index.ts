import express from "express";
import { application } from "./constants/appVariable";

const app = express();
//configure application routes
//@GET - dummy api route
//@ts-ignore
app.get('/api', (req, res, next) => {
    res.status(200).json({
      hello: 'World!',
    });
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