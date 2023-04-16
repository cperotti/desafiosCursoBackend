import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from '../../desafio5/src/utils.js';
import { Server } from 'socket.io';
import ProductManager from "./ProductManager.js";

const products = new ProductManager('desafio5/src/dataProducts.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const httpServer = app.listen(8080, ()=> console.log('servidor arriba'));

const socketServer = new Server(httpServer)

app.engine('handlebars', handlebars.engine());

app.set('views',`${__dirname}/views`);

app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/public`))

app.get('/home',(req, res)=>{

    products.getProducts().then((response)=>{
        let testProduct={
            products: response,
            title: 'Desafio 5',
            listTitle: 'Lista de productos'
        }
    
        res.render('home', testProduct)
    })

})

app.get('/realtimeproducts',(req, res)=>{
    let title = {
        listTitle: 'Lista de productos con WebSocket'
    }
    res.render('realTimeProducts', title)
})

socketServer.on('connection', socket=>{
    console.log('Nuevo cliente conectado')

    products.getProducts().then((response)=>{
        socket.emit('products', response )
    })
})
