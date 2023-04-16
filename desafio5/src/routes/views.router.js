import {Router} from 'express';
import ProductManager from "../managers/ProductManager.js";

const products = new ProductManager('desafio5/src/managers/dataProducts.json');

const router = Router()

router.get('/realtimeproducts',(req, res)=>{
    let title = {
        generalTitle: 'Productos con WebSocket',
        listTitle: 'Listado'
    }
    res.render('realTimeProducts', title)
})

router.get('/home',(req, res)=>{

    products.getProducts().then((response)=>{
        let testProduct={
            products: response,
            title: 'Desafio 5',
            listTitle: 'Lista de productos'
        }
    
        res.render('home', testProduct)
    })

})


export default router;
