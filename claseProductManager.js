class ProductManager {
    constructor(){
        this.idProduct= 0;
        this.products = [];
    }

    addProduct = (product) =>{
        const hasSameCode = this.products.find(prod=> prod.code === product.code)
        if(hasSameCode){
            console.log(`Ya existe un producto con el código ${hasSameCode.code}, por favor ingresa uno nuevo`)
        }else if(product.title && product.description && product.thumbnail && product.code && product.stock && product.price) {
            this.idProduct++
            this.products.push({...product, id: this.idProduct})
        }else{
            console.log('Los campos title, description, stock, price, code y thumbnail son obligatorios. Detectamos que alguno de estos no has enviado. Por favor completa todos los campos')
        }
    }
    getProducts = () =>{
        return this.products
    }
    getProductById = (id) =>{
        const productSearch = this.products.find(product => product.id === id)
        if(productSearch){
            return productSearch
        }else{
            return "Not found"
        }
    }
}

const product1 = new ProductManager()
console.log(product1.getProducts())
product1.addProduct({title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail :'Sin imagen', code:'abc123', stock:25})
console.log(product1.getProducts())
product1.addProduct({title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail :'Sin imagen', code:'abc123', stock:25})
console.log(product1.getProductById(3))
