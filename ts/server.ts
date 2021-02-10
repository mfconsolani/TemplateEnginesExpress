import express, {Application, Request, Response} from 'express';
import MetodosServidor, { Product } from './handlerClass';

// Server set-up
const app:Application = express();

const PORT = 8080;


// Global variables
const router = express.Router();

let db:Array<Product> = [];

let instance = new MetodosServidor(db);

// Middleware

app.use(express.static(__dirname + '/public'))

app.use(express.json())

app.use(express.urlencoded({extended: true}))

// Server Port config

const server:any = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
});

server.on("Error", (error:Error) => {
    console.log(`Se produjo el siguiente error al inicializar el servidor: ${error}`)
});

// Get requests

// Listar todos los productos
router.get('/productos', (req: Request, res: Response) => {    
    instance.displayAll(res);
});

// Listar un producto específico
router.get('/productos/:id', (req: Request, res: Response) => {
    instance.displayOne(req, res);    
});


// Post requests

// Cargar un nuevo producto
router.post('/productos/', (req: Request, res: Response)=> { 
    instance.saveProduct(req, res)
});

// Put requests

// Reemplzar datos

router.put('/productos/:id', (req: Request, res: Response)=> {
    instance.replaceData(req, res);
})

// Delete requests

// Elimina un producto

router.delete('/productos/:id', (req: Request, res: Response) => {
    instance.deleteItem(req, res)
})

// Router

app.use('/api', router);


