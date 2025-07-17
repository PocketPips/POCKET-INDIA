onst categories = ['Vegetables', 'Fruits', 'Dairy', 'Snacks', 'Beverages'];

const products = {
  Vegetables: [
    { name: 'Tomato', price: 20, img: 'images/tomato.png' },
    { name: 'Onion', price: 30, img: 'images/onion.png' },
    { name: 'Potato', price: 25, img: 'images/potato.png' },
    // Add more (50+) items...
  ],
  Fruits: [
    { name: 'Apple', price: 60, img: 'images/apple.png' },
    { name: 'Banana', price: 40, img: 'images/banana.png' },
    { name: 'Mango', price: 80, img: 'images/mango.png' },
const itemsData = {
  vegetables: [
    { name: "Tomato", price: 20, img: "images/tomatoo.jpg" },
    { name: "Onion", price: 30, img: "images/-onions-background-photo.jpg" },
    // Add more up to 50+ items...
  ],
  Dairy: [
    { name: 'Milk', price: 30, img: 'images/milk.png' },
    { name: 'Curd', price: 25, img: 'images/curd.png' },
    { name: 'Cheese', price: 90, img: 'images/cheese.png' },
  fruits: [
    { name: "Apple", price: 120, img: "images/apple.png" },
    { name: "Banana", price: 40, img: "images/banana.png" },
    // Add more
  ],
  Snacks: [
    { name: 'Chips', price: 20, img: 'images/chips.png' },
    { name: 'Biscuits', price: 25, img: 'images/biscuits.png' },
    { name: 'Chocolate', price: 50, img: 'images/chocolate.png' },
  dairy: [
    { name: "Milk", price: 50, img: "images/milk.png" },
    { name: "Curd", price: 35, img: "images/curd.png" },
    // Add more
  ],
  Beverages: [
    { name: 'Coke', price: 35, img: 'images/coke.png' },
    { name: 'Juice', price: 45, img: 'images/juice.png' },
    { name: 'Energy Drink', price: 60, img: 'images/energy.png' },
  snacks: [
    { name: "Chips", price: 20, img: "images/chips.png" },
    { name: "Biscuits", price: 25, img: "images/biscuits.png" },
    // Add more
  ],
  beverages: [
    { name: "Coke", price: 45, img: "images/coke.png" },
    { name: "Juice", price: 60, img: "images/juice.png" },
    // Add more
  ]
};

let cart = {};

function createCategoryButtons() {
  const catContainer = document.getElementById('category-buttons');
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.innerText = cat;
    btn.className = 'category-btn';
    btn.onclick = () => showCategory(cat);
    catContainer.appendChild(btn);
  });
}

function showCategory(category) {
  const container = document.getElementById('products');
  container.innerHTML = '';
  container.classList.add('active');

  products[category].forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <div class="price">₹${item.price}</div>
      <div class="cart-buttons">
        <button class="minus" onclick="decreaseQty('${category}', ${index})">-</button>
        <span class="quantity">${cart[item.name]?.qty || 0}</span>
        <button class="add" onclick="addToCart('${category}', ${index})">+</button>
function renderItems(category) {
  const section = document.getElementById('items');
  section.innerHTML = '';
  itemsData[category].forEach(item => {
    const count = cart[item.name] || 0;
    section.innerHTML += `
      <div class="item">
        <img src="${item.img}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <div class="cart-btns">
          ${count > 0 
            ? `<button onclick="decrement('${item.name}')">-</button><span>${count}</span><button onclick="increment('${item.name}', ${item.price}, '${item.img}')">+</button>`
            : `<button onclick="increment('${item.name}', ${item.price}, '${item.img}')">Add to Cart</button>`
          }
        </div>
      </div>
      <button class="remove" onclick="removeFromCart('${item.name}')">Remove</button>
    `;
    container.appendChild(card);
  });
}

function addToCart(category, index) {
  const item = products[category][index];
  if (cart[item.name]) {
    cart[item.name].qty += 1;
  } else {
    cart[item.name] = { ...item, qty: 1 };
  }
  updateCartUI();
function increment(name, price, img) {
  if (!cart[name]) cart[name] = 0;
  cart[name]++;
  renderItems(getCurrentCategory());
  updateCart();
}

function decreaseQty(category, index) {
  const item = products[category][index];
  if (cart[item.name]) {
    cart[item.name].qty -= 1;
    if (cart[item.name].qty <= 0) {
      delete cart[item.name];
    }
function decrement(name) {
  if (cart[name]) {
    cart[name]--;
    if (cart[name] <= 0) delete cart[name];
    renderItems(getCurrentCategory());
    updateCart();
  }
  updateCartUI();
}

function removeFromCart(name) {
  delete cart[name];
  updateCartUI();
function updateCart() {
  const cartList = document.getElementById('cartItems');
  const total = Object.entries(cart).reduce((sum, [name]) => {
    const category = Object.values(itemsData).flat().find(item => item.name === name);
    return sum + category.price * cart[name];
  }, 0);

  cartList.innerHTML = Object.entries(cart).map(([name, qty]) =>
    `<li>${name} x ${qty}</li>`
  ).join('');

  document.getElementById('totalPrice').textContent = `Total: ₹${total}`;
  document.getElementById('whatsappOrder').href = `https://wa.me/918082753024?text=I%20want%20to%20order:%0A` +
    Object.entries(cart).map(([name, qty]) => `${name} x ${qty}`).join('%0A') +
    `%0ATotal: ₹${total}`;
}

function updateCartUI() {
  showCategory(Object.keys(products).find(c => products[c].some(p => cart[p.name])));
  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cart-summary').innerText = `🛒 Cart (${totalItems} items)`;
function toggleCart() {
  const popup = document.getElementById('cartPopup');
  popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

function sendWhatsAppOrder() {
  if (Object.keys(cart).length === 0) {
    alert("Cart is empty!");
    return;
  }
  let message = "Order from Pocket India:\n";
  Object.values(cart).forEach(item => {
    message += `${item.name} x ${item.qty} = ₹${item.price * item.qty}\n`;
  });
  const total = Object.values(cart).reduce((sum, item) => sum + item.qty * item.price, 0);
  message += `\nTotal = ₹${total}`;
  const whatsappURL = `https://wa.me/918082753024?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
function getCurrentCategory() {
  return document.querySelector('.cat-btn.active')?.dataset.cat || 'vegetables';
}

document.addEventListener('DOMContentLoaded', () => {
  createCategoryButtons();
  document.getElementById('cart-summary').addEventListener('click', sendWhatsAppOrder);
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderItems(btn.dataset.cat);
  });
});