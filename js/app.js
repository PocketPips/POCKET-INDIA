// app.js

const products = [
  { name: "Tomato", price: 28, image: "images/vegetable/tomato.jpg" },
  { name: "Potato", price: 24, image: "images/vegetable/potato.jpg" },
  { name: "Onion", price: 30, image: "images/vegetable/onion.jpg" },
  { name: "Lemon", price: 100, image: "images/vegetable/lemon.jpg" },
  { name: "Pumpkin", price: 20, image: "images/vegetable/pumpkin.jpg" },
  { name: "Mushroom", price: 110, image: "images/vegetable/mushroom.jpg" },
  { name: "Chilli", price: 70, image: "images/vegetable/chilli.jpg" },
  { name: "Lady Finger", price: 44, image: "images/vegetable/ladyfinger.jpg" },
  { name: "Ridge Gourd", price: 36, image: "images/vegetable/ridgegourd.jpg" },
  { name: "Brinjal", price: 26, image: "images/vegetable/brinjal.jpg" }
];

const cart = {};

function renderProducts() {
  const list = document.getElementById('product-list');
  list.innerHTML = '';

  products.forEach((p, i) => {
    const item = document.createElement('div');
    item.className = 'product-item';
    item.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}/kg</p>
      <button class="add-btn" onclick="addToCart(${i})">Add to Cart</button>
    `;
    list.appendChild(item);
  });
}

function addToCart(index) {
  const product = products[index];
  if (cart[product.name]) {
    cart[product.name]++;
  } else {
    cart[product.name] = 1;
  }
  updateCart();
}

function updateCart() {
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  document.getElementById('cart-count').textContent = cartCount;

  const cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';
  for (const [name, qty] of Object.entries(cart)) {
    cartList.innerHTML += `<li>${name} - ${qty} kg</li>`;
  }

  document.getElementById('cart-summary').style.display = cartCount > 0 ? 'block' : 'none';
}

function toggleCart() {
  const cartDiv = document.getElementById('cart-summary');
  cartDiv.style.display = cartDiv.style.display === 'none' ? 'block' : 'none';
}

function placeOrder() {
  const items = Object.entries(cart).map(([name, qty]) => `${name} - ${qty} kg`).join('%0A');
  const message = `Hello Pocket India,%0AHere is my order:%0A${items}`;
  window.open(`https://wa.me/918082753024?text=${message}`, '_blank');
}

window.onload = renderProducts;
