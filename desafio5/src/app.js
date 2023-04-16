import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from '../../desafio5/src/utils.js';
import { Server } from 'socket.io';
import ProductManager from "./managers/ProductManager.js";
import viewsRouter from './routes/views.router.js';

const products = new ProductManager('desafio5/src/managers/dataProducts.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const httpServer = app.listen(8080, ()=> console.log('servidor arriba'));

const io = new Server(httpServer)

app.engine('handlebars', handlebars.engine());

app.set('views',`${__dirname}/views`);

app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/public`))

app.use('/', viewsRouter)

io.on('connection', socket=>{
    console.log('Nuevo cliente conectado')

    products.getProducts().then((response)=>{
        socket.emit('products', response )
    })
    .catch(error => console.log(error))

    socket.on('newProduct', dataProduct=>{
        console.log(dataProduct)
        products.addProduct(dataProduct).then(response =>{
            socket.emit('response', response)
        })
        .catch(error => console.log(error))
    })

    socket.on('deleteProduct', id =>{
        console.log(id)
        products.deleteProduct(id).then(response =>{
            socket.emit('response', response)
        })
        .catch(error => console.log(error))
    })
})
