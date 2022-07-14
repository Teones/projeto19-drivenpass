import express, { json } from "express";
import cors from "cors"
import "express-async-errors";
import dotenv from "dotenv";

import router from "./routes/index.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors())
app.use(router);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});