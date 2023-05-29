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
        name: 'Áo dài xanh lam',
        image: 'aodaixanhlam.jpg',
        price: 1050000
    },
    {
        id: 2,
        name: 'Áo dài xanh lục',
        image: 'aodaixanhluc.jpg',
        price: 1040000
    },
    {
        id: 3,
        name: 'Áo sơ mi công sở',
        image: 'aosomicongso.jpg',
        price: 250000
    },
    {
        id: 4,
        name: 'Áo thun công sở',
        image: 'aothuncongso.jpg',
        price: 260000
    },
    {
        id: 5,
        name: 'Chân váy dạo phố',
        image: 'chanvaydaopho.jpg',
        price: 550000
    },
    {
        id: 6,
        name: 'Quần Short dạo phố',
        image: 'quanshortdaopho.jpg',
        price: 200000
    },
    {
        id: 7,
        name: 'Quần jean nữ',
        image: 'quanjeanu.jpg',
        price: 250000
    },
    {
        id: 8,
        name: 'Bộ vest nữ',
        image: 'aovestnu.jpg',
        price: 2500000
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