// js/app.js

const products = [
  // 🥦 Vegetables
  { id: 1, name: "Tomato", price: 30, category: "vegetables", image: "images/tomato.png" },
  { id: 2, name: "Potato", price: 25, category: "vegetables", image: "images/potato.png" },
  { id: 3, name: "Carrot", price: 40, category: "vegetables", image: "images/carrot.png" },
  { id: 4, name: "Onion", price: 35, category: "vegetables", image: "images/onion.png" },
  { id: 5, name: "Cauliflower", price: 45, category: "vegetables", image: "images/cauliflower.png" },
  { id: 6, name: "Broccoli", price: 60, category: "vegetables", image: "images/broccoli.png" },
  { id: 7, name: "Capsicum", price: 50, category: "vegetables", image: "images/capsicum.png" },
  { id: 8, name: "Brinjal", price: 35, category: "vegetables", image: "images/brinjal.png" },
  { id: 9, name: "Cabbage", price: 30, category: "vegetables", image: "images/cabbage.png" },
  { id: 10, name: "Cucumber", price: 20, category: "vegetables", image: "images/cucumber.png" },
  // 🍎 Fruits
  { id: 11, name: "Apple", price: 100, category: "fruits", image: "images/apple.png" },
  { id: 12, name: "Banana", price: 45, category: "fruits", image: "images/banana.png" },
  { id: 13, name: "Orange", price: 60, category: "fruits", image: "images/orange.png" },
  { id: 14, name: "Mango", price: 80, category: "fruits", image: "images/mango.png" },
  { id: 15, name: "Grapes", price: 70, category: "fruits", image: "images/grapes.png" },
  // 🧀 Dairy
  { id: 16, name: "Milk", price: 25, category: "dairy", image: "images/milk.png" },
  { id: 17, name: "Curd", price: 30, category: "dairy", image: "images/curd.png" },
  { id: 18, name: "Paneer", price: 90, category: "dairy", image: "images/paneer.png" },
  { id: 19, name: "Butter", price: 45, category: "dairy", image: "images/butter.png" },
  // 🍪 Snacks
  { id: 20, name: "Chips", price: 20, category: "snacks", image: "images/chips.png" },
  { id: 21, name: "Biscuits", price: 15, category: "snacks", image: "images/biscuits.png" },
  { id: 22, name: "Noodles", price: 30, category: "snacks", image: "images/noodles.png" },
  { id: 23, name: "Namkeen", price: 25, category: "snacks", image: "images/namkeen.png" },
  { id: 24, name: "Popcorn", price: 35, category: "snacks", image: "images/popcorn.png" },
  // 🥤 Beverages
  { id: 25, name: "Coke", price: 35, category: "beverages", image: "images/coke.png" },
  { id: 26, name: "Pepsi", price: 35, category: "beverages", image: "images/pepsi.png" },
  { id: 27, name: "Juice", price: 50, category: "beverages", image: "images/juice.png" },
  { id: 28, name: "Lassi", price: 30, category: "beverages", image: "images/lassi.png" },
  { id: 29, name: "Energy Drink", price: 90, category: "beverages", image: "images/energy.png" },
];

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const whatsappOrder = document.getElementById("whatsappOrder");
let cart = {};

function renderProducts() {
  productGrid.innerHTML = "";
  products.forEach(product => {
    const item = document.createElement("div");
    item.className = `product-item ${product.category}`;
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}/kg</p>
      <div class="cart-actions" id="actions-${product.id}">
        <button onclick="addToCart(${product.id})">Add</button>
      </div>
    `;
    productGrid.appendChild(item);
  });
}

function updateCartDisplay() {
  cartItems.innerHTML = "";
  let total = 0;
  for (let id in cart) {
    const { name, price, quantity } = cart[id];
    total += price * quantity;
    const li = document.createElement("li");
    li.innerHTML = `
      ${name} x ${quantity} = ₹${price * quantity}
      <button onclick="changeQty(${id}, -1)">−</button>
      <button onclick="changeQty(${id}, 1)">+</button>
      <button onclick="removeFromCart(${id})">🗑</button>
    `;
    cartItems.appendChild(li);
    document.getElementById(`actions-${id}`).innerHTML = `
      <button onclick="changeQty(${id}, -1)">−</button>
      <span>${quantity}</span>
      <button onclick="changeQty(${id}, 1)">+</button>
    `;
  }
  cartTotal.textContent = total;
  let orderText = Object.values(cart).map(item => `${item.name} x ${item.quantity}`).join("%0A");
  whatsappOrder.href = `https://wa.me/918082753024?text=My%20Pocket%20India%20Order:%0A${orderText}%0ATotal: ₹${total}`;
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  if (!cart[id]) cart[id] = { ...item, quantity: 1 };
  else cart[id].quantity++;
  updateCartDisplay();
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id].quantity += delta;
  if (cart[id].quantity <= 0) delete cart[id];
  updateCartDisplay();
}

function removeFromCart(id) {
  delete cart[id];
  updateCartDisplay();
}

function filterCategory(cat) {
  document.querySelectorAll(".product-item").forEach(item => {
    item.style.display = (cat === "all" || item.classList.contains(cat)) ? "block" : "none";
  });
}

renderProducts();
