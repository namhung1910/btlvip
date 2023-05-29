let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Áo thun nam',
        image: 't-shirt-man.png',
        price: 150000
    },
    {
        id: 2,
        name: 'Áo thun nữ',
        image: 't-shirt-wm.png',
        price: 145000
    },
    {
        id: 3,
        name: 'Quần short nam',
        image: 'shorthong-m.jpg',
        price: 160000
    },
    {
        id: 4,
        name: 'Áo trễ vai nữ',
        image: 'aotrevai-wm.jpg',
        price: 190000
    },
    {
        id: 5,
        name: 'Váy nữ',
        image: 'vay-wm.jpg',
        price: 170000
    },
    {
        id: 6,
        name: 'Áo ba lỗ nam',
        image: 'aobalo-m.jpg',
        price: 120000
    },
    {
        id: 7,
        name: 'Đồ thể thao nam',
        image: 'thethao-m.jpg',
        price: 200000
    },
    {
        id: 8,
        name: 'Đồ thể thao nữ',
        image: 'thethao-wm.jpg',
        price: 250000
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Thêm vào giỏ hàng</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}