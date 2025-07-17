const categories = ['Vegetables', 'Fruits', 'Dairy', 'Snacks', 'Beverages'];

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
  ],
  Dairy: [
    { name: 'Milk', price: 30, img: 'images/milk.png' },
    { name: 'Curd', price: 25, img: 'images/curd.png' },
    { name: 'Cheese', price: 90, img: 'images/cheese.png' },
  ],
  Snacks: [
    { name: 'Chips', price: 20, img: 'images/chips.png' },
    { name: 'Biscuits', price: 25, img: 'images/biscuits.png' },
    { name: 'Chocolate', price: 50, img: 'images/chocolate.png' },
  ],
  Beverages: [
    { name: 'Coke', price: 35, img: 'images/coke.png' },
    { name: 'Juice', price: 45, img: 'images/juice.png' },
    { name: 'Energy Drink', price: 60, img: 'images/energy.png' },
  ],
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
}

function decreaseQty(category, index) {
  const item = products[category][index];
  if (cart[item.name]) {
    cart[item.name].qty -= 1;
    if (cart[item.name].qty <= 0) {
      delete cart[item.name];
    }
  }
  updateCartUI();
}

function removeFromCart(name) {
  delete cart[name];
  updateCartUI();
}

function updateCartUI() {
  showCategory(Object.keys(products).find(c => products[c].some(p => cart[p.name])));
  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cart-summary').innerText = `🛒 Cart (${totalItems} items)`;
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
}

document.addEventListener('DOMContentLoaded', () => {
  createCategoryButtons();
  document.getElementById('cart-summary').addEventListener('click', sendWhatsAppOrder);
});
