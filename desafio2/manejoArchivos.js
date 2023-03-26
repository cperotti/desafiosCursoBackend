const { promises } = require('fs')
const fs = promises

class ProductManager {
    constructor(path){
        this.idProduct= 0;
        this.path=path;

        // this.createFile() //descomentar cuando no este creado el archivo
        
    }

    // createFile = async() => {
    //     try{
    //         let productsJson = JSON.stringify([], null, '\t')
    //         await fs.writeFile(this.path, productsJson, 'utf-8')
    //     }
    //     catch (error){
    //         console.log(error)
    //     }
    // }

    addProduct = async(product) =>{
        try{
            let dataFile =  await fs.readFile( this.path, 'utf-8')
            const productsParse = JSON.parse(dataFile);

            const hasSameCode = productsParse.find(prod=> prod.code === product.code)
            if(hasSameCode){
                console.log(`Ya existe un producto con el código ${hasSameCode.code}, por favor ingresa uno nuevo`)
            }else if(product.title && product.description && product.thumbnail && product.code && product.stock && product.price) {
                productsParse.push({...product, id: productsParse.length +1})
                let productsJson = JSON.stringify(productsParse, null, 2)
                await fs.writeFile(this.path, productsJson, 'utf-8')
            }else{
                console.log('Los campos title, description, stock, price, code y thumbnail son obligatorios. Detectamos que alguno de estos no has enviado. Por favor completa todos los campos')
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    getProducts = async() =>{
        try{
            let dataFile =  await fs.readFile( this.path, 'utf-8')
            const productsParse = JSON.parse(dataFile);
            console.log('soy products',productsParse)
        }
        catch (error){
            console.log(error);
        }
    }

    getProductById = async(id) =>{
        try{
            let dataFile =  await fs.readFile( this.path, 'utf-8')
            const productsParse = JSON.parse(dataFile);
            const productSearch = productsParse.find(product => product.id === id)
            if(productSearch){
                return console.log(`Se encontró un producto con el id ${id}: `,productSearch)
            }else{
                return console.log("Not found")
            }
        }
        catch (error){
            console.log(error);
        }
    }

    updateProduct = async(id, dataUpdate) =>{
        try{
            let dataFile =  await fs.readFile( this.path, 'utf-8')
            const productsParse = JSON.parse(dataFile);
            const updateProduct = productsParse.map(product => {
                if(product.id === id ){
                    return{
                        ...product,
                        ...dataUpdate
                    }
                }
                return product
            })

            let productsJson = JSON.stringify(updateProduct, null, 2)
            await fs.writeFile(this.path, productsJson, 'utf-8')
    
        }
        catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async(id) => {
        try{
            let dataFile =  await fs.readFile( this.path, 'utf-8')
            const productsParse = JSON.parse(dataFile);

            const indexObject = productsParse.findIndex(product => { return product.id === id});
            
            productsParse.splice(indexObject,1)

            console.log(productsParse)

            let productsJson = JSON.stringify(productsParse, null, 2)
            await fs.writeFile(this.path, productsJson, 'utf-8')

        }
        catch (error){
            console.log(error);
        }
    }

}

const product1 = new ProductManager('./dataProducts.json')
console.log(product1.getProducts())
console.log(product1.getProductById(1))
console.log(product1.updateProduct(1,{title: 'productos editado'}))
// console.log(product1.getProducts())
console.log(product1.deleteProduct(1)) //ver el eliminar que no esta funcionando bien. capaz tengo que usar append y no write
// product1.addProduct({title: 'producto prueba', description: 'Este es un producto prueba', price: 250, thumbnail :'Sin imagen', code:'abc123', stock:10})
// console.log(product1.getProducts())
// product1.addProduct({title: 'producto prueba2', description: 'Este es un producto prueba2', price: 200, thumbnail :'Sin imagen', code:'abc1234', stock:25})
// console.log(product1.getProducts())