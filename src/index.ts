import express, { json, urlencoded } from "express";
import { AppDataSource } from "./data-source";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import clientsRouter from "./routes/clients";
import categoriesRouter from "./routes/categories";
import productsRouter from "./routes/products";
import ordersRouter from "./routes/orders";

const server = express();

server.use(cors());
server.use(helmet());
server.use(morgan("dev"));
server.use(json());
server.use(urlencoded({ extended: false }));

server.use("/clients", clientsRouter);
server.use("/categories", categoriesRouter);
server.use("/products", productsRouter);
server.use("/orders", ordersRouter);

server.use("*", (req, res) => {
  res.status(404).send({ message: "not found" });
});

server.listen(process.env.PORT, async () => {
  console.log(`now you connected by port No ${process.env.PORT}`);
  try {
    await AppDataSource.initialize();
    console.log("now you connected to database");
  } catch (error) {
    console.log(error);
  }
});
