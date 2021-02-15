import express, { Application } from "express";
import { productRoutes } from "./products";
import path from "path";
import pug from "pug";
// import handlebars from "express-handlebars";

// Global variables
const app: Application = express();

const PORT = 8080;

// Middleware

app.set("view engine", "pug");

app.set("views", "./views");

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Server Port config

const server: any = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${server.address().port}`);
});

server.on("Error", (error: Error) => {
  console.log(
    `Se produjo el siguiente error al inicializar el servidor: ${error}`
  );
});

// Router

app.use("/api", productRoutes);
