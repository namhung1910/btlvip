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
        name: 'Bộ ngắn tay bé gái hình con mèo',
        image: 'bongantaybegaihinhconmeo.jpg',
        price: 150000
    },
    {
        id: 2,
        name: 'Bộ ngắn tay bé gái màu vàng hồng',
        image: 'bongantaybegaivanghong.jpg',
        price: 210000
    },
    {
        id: 3,
        name: 'Bộ ngắn tay bé gái màu xanh lam',
        image: 'bongantaybegaixanhlam.jpg',
        price: 160000
    },
    {
        id: 4,
        name: 'Bộ ngắn tay bé gái xanh lục',
        image: 'bongantaybegaixanhluc.jpg',
        price: 230000
    },
    {
        id: 5,
        name: 'Bộ ngắn tay bé trai màu vàng',
        image: 'bongantaybetraimauvang.jpg',
        price: 240000
    },
    {
        id: 6,
        name: 'Bộ ngắn tay bé trai màu vàng trắng',
        image: 'bongantaybetraivangtrang.jpg',
        price: 250000
    },
    {
        id: 7,
        name: 'Bộ ngắn tay bé trai màu xanh trắng',
        image: 'bongantaybetraixanhtrang.jpg',
        price: 260000
    },
    {
        id: 8,
        name: 'Quần đùi và áo ba lỗ bé gái',
        image: 'quanduivaaobalobegai.jpg',
        price: 350000
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