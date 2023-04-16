console.log('Socket')
const socket = io()

socket.on('products', data => {
    console.log(data)

    let listProducts = document.getElementById('listProducts')
    let products = ''
    data.forEach(({title}) => {
        products += `<li class="list-group-item">${title}</li>`
    })
    listProducts.innerHTML = products
})
