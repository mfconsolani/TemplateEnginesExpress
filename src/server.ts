import express, { Application } from 'express';

import { productRoutes } from './productRoutes';

import path from 'path'; 

import handlebars from 'express-handlebars';

// Global variables
const app:Application = express();

const PORT = 8080;

// Middleware

app.engine('hbs', 
    handlebars({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: path.join(__dirname, '../views/layouts'),
        partialsDir: path.join(__dirname, '../views/partials')
        })
    );

app.set('view engine', 'hbs');

app.set('views', './views');

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


