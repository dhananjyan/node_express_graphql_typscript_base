import "reflect-metadata";
import express from "express";
import connectDb from "./utils/connectDb";
import apolloServer from "./utils/apolloServer";
import compression from 'compression';
import { authenticate } from "./utils/jwt";
import cors from "cors";

async function server() {

  const app = express();

  // Middlewares
  app.use(express.json()) // for parsing application/json
  app.use(express.urlencoded({ extended: true }))
  app.use(compression()) // Compress the response
  app.use(authenticate) // validate authorization token

  // Logging middleware to show the original URL
  // app.use((req, res, next) => {
  //   console.log(req?.originalUrl);
  //   next();
  // });

  app.use(cors())

  await connectDb(); // Connect DB

  await apolloServer(app);  // Graphql server

  app.listen(4000, () => console.log("🚀 Server running on http://localhost:4000"));
}

export default server