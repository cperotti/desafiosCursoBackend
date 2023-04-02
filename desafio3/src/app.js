import express from 'express';
import ProductManager from "./ProductManager.js";

const products = new ProductManager('./dataProducts.json');

const app = express();

app.use(express.urlencoded({extended: true}))

app.get('/products', (req,res)=>{
    
    products.getProducts().then((response)=>{
        let {limit} = req.query
        if(limit) return res.send({products: response.slice(0, limit)})
        res.send({products: response})
    })
    .catch((error)=>console.log(error))
})

app.get('/products/:pid', (req,res)=>{
    
    products.getProducts().then((response)=>{
        let {pid} = req.params
        const findProduct = response.find((product)=> product.id === parseInt(pid))
        if(!findProduct) return res.send('No encontramos un elemento con el id ingresado')
        res.send(findProduct)
    })
    .catch((error)=>console.log(error))
})

app.listen(8080, ()=> console.log('servidor arriba'))