"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handlerClass_1 = __importDefault(require("./handlerClass"));
const path_1 = __importDefault(require("path"));
const handlebars = require('express-handlebars');
// Global variables
const app = express_1.default();
const PORT = 8080;
const router = express_1.default.Router();
let db = [];
let instance = new handlerClass_1.default(db);
// Middleware
app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Server Port config
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`);
});
server.on("Error", (error) => {
    console.log(`Se produjo el siguiente error al inicializar el servidor: ${error}`);
});
// Get requests
// Listar todos los productos
router.get('/productos', (req, res) => {
    instance.displayAll(res);
});
// 
router.get('/productos/vista', (req, res) => {
    instance.renderApp(req, res);
});
// Listar un producto específico
router.get('/productos/:id', (req, res) => {
    instance.displayOne(req, res);
});
// Post requests
// Cargar un nuevo producto
router.post('/productos/', (req, res) => {
    instance.saveProduct(req, res);
});
// Put requests
// Reemplzar datos
router.put('/productos/:id', (req, res) => {
    instance.replaceData(req, res);
});
// Delete requests
// Elimina un producto
router.delete('/productos/:id', (req, res) => {
    instance.deleteItem(req, res);
});
// Router
app.use('/api', router);
