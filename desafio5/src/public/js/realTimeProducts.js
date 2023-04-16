console.log('Socket')
const socket = io()

let name = document.getElementById('title');
let description = document.getElementById('description');
let code = document.getElementById('code');
let price = document.getElementById('price');
let stock = document.getElementById('stock');
let thumbnail = document.getElementById('thumbnail');
let category = document.getElementById('category');
let status = document.getElementById('status');
let formAdd = document.querySelector('#formAdd');

let formDelete = document.querySelector('#formDelete');
let id = document.getElementById('id');

const deletAlert = () => {
    setTimeout(()=>{
        let divPadre = document.getElementById('alerts')
        let alert = document.getElementById('prueba')
        divPadre.removeChild(alert)
    },5000)
}

socket.on('products', data => {
    let listProducts = document.getElementById('listProducts')
    let products = ''
    data.forEach(({title}) => {
        products += `<li class="list-group-item">${title}</li>`
    })
    listProducts.innerHTML = products
})

formAdd.addEventListener('submit', evento=>{
    evento.preventDefault()
    socket.emit('newProduct', {
        title: title.value,
        description:description.value,
        price: parseInt(price.value),
        code: code.value,
        stock: parseInt(stock.value),
        category: category.value,
        thumbnail: thumbnail.value,
        status: status.value === 'active'
    })

    title.value = ''
    description.value= ''
    price.value = null
    code.value= ''
    stock.value = null
    category.value=''
    thumbnail.value=''
    status.value= 'active'

    deletAlert()

})

formDelete.addEventListener('submit', evento => {
    evento.preventDefault()

    socket.emit('deleteProduct', id.value)

    id.value = null
    deletAlert()
})

socket.on('response', response=>{
    let alerts = document.getElementById('alerts')
    let textAlert = `<div id="prueba" class="alert alert-info alert-dismissible fade show" role="alert">${response}</div>`
    alerts.innerHTML = textAlert
})


