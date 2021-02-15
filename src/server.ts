import express, { Application } from 'express';

import { productRoutes } from './products';

import ejs from 'ejs';

import path from 'path'; 

// Global variables
const app:Application = express();

const PORT = 8080;

// Middleware

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

// Server Port config

const server:any = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
});

server.on("Error", (error:Error) => {
    console.log(`Se produjo el siguiente error al inicializar el servidor: ${error}`)
});

// Router

app.use('/api', productRoutes);


