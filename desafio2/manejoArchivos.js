const { promises } = require('fs')
const fs = promises

class ProductManager {
    constructor(path){
        this.path=path;
    }

    createFile = async() => {
        try{
            let productsJson = JSON.stringify([], null, 2)
            await fs.writeFile(this.path, productsJson, 'utf-8')
            return 'Archivo creado con éxito'
        }
        catch (error){
            console.log(error)
        }
    }

    addProduct = async(product) =>{
        try{
            const productsParse = await this.getProducts()

            const hasSameCode = productsParse.find(prod=> prod.code === product.code)
            if(hasSameCode){
                return `Ya existe un producto con el código ${hasSameCode.code}, por favor ingresa uno nuevo`
            }else if(product.title && product.description && product.thumbnail && product.code && product.stock && product.price) {
                const idProduct = productsParse.length === 0 ? 1 : productsParse[productsParse.length-1].id +1
                productsParse.push({...product, id: idProduct})

                let productsJson = JSON.stringify(productsParse, null, 2)
                await fs.writeFile(this.path, productsJson, 'utf-8')

                return 'Producto agregado exitosamente'
            }else{
                return 'Los campos title, description, stock, price, code y thumbnail son obligatorios. Detectamos que alguno de estos no has enviado. Por favor completa todos los campos'
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    getProducts = async() =>{
        try{
            let dataFile =  await fs.readFile( this.path, 'utf-8')
            const productsParse = await JSON.parse(dataFile);
            return productsParse
        }
        catch (error){
            console.log(error);
        }
    }

    getProductById = async(id) =>{
        try{
            const productsParse = await this.getProducts()

            const productSearch = productsParse.find(product => product.id === id)
            if(productSearch){
                return productSearch
            }else{
                return "Not found"
            }
        }
        catch (error){
            console.log(error);
        }
    }

    updateProduct = async(id, dataUpdate) =>{
        try{
            const productsParse = await this.getProducts()

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

            return 'Producto editado exitosamente'
    
        }
        catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async(id) => {
        try{
            const productsParse = await this.getProducts()

            const indexObject = productsParse.findIndex(product => { return product.id === id});
            
            productsParse.splice(indexObject,1)

            let productsJson = JSON.stringify(productsParse, null, 2)
            await fs.writeFile(this.path, productsJson, 'utf-8')

            return 'Producto eliminado exitosamente'

        }
        catch (error){
            console.log(error);
        }
    }

}

const product = new ProductManager('./dataProducts.json')
product.createFile().then((data) => console.log(data)) //comentar cuando se haya creado el archivo.
// product.getProducts().then((data)=> console.log(data))
// product.addProduct({title: 'producto prueba', description: 'Este es un producto prueba', price: 250, thumbnail :'Sin imagen', code:'abc123', stock:10}).then((data)=>{
//     console.log(data)
//     product.getProducts().then((data)=> console.log(data))
// })
// product.getProductById(1).then((data)=> console.log(data))
// product.updateProduct(1,{title: 'producto editado', price: 300}).then((data)=>{
//     console.log(data)
//     product.getProducts().then((data)=> console.log(data))
// })
// product.deleteProduct(1).then((data)=> {
//     console.log(data)
//     product.getProducts().then((data)=> console.log(data))
// })