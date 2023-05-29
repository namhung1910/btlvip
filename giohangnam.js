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
        name: 'Áo da',
        image: 'aoda.jpg',
        price: 500000
    },
    {
        id: 2,
        name: 'Áo khoác xanh lá cây',
        image: 'aokhoacxanhlacay.jpg',
        price: 350000
    },
    {
        id: 3,
        name: 'Áo sơ mi ca rô',
        image: 'aosomicaro.jpg',
        price: 160000
    },
    {
        id: 4,
        name: 'Áo sơ mi sọc chàm',
        image: 'aosomisoccham.jpg',
        price: 190000
    },
    {
        id: 5,
        name: 'Áo vest xanh tím than kẻ ô',
        image: 'aovestxanhtimthankeo.jpg',
        price: 2500000
    },
    {
        id: 6,
        name: 'Áo vest Beige họa tiết herringbone',
        image: 'aovestbeigehoatietherringbone.jpg',
        price: 3000000
    },
    {
        id: 7,
        name: 'Quần jean Levi',
        image: 'jeanlevi.jpg',
        price: 600000
    },
    {
        id: 8,
        name: 'Quần Tây',
        image: 'Chino-trousers.jpeg',
        price: 650000
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