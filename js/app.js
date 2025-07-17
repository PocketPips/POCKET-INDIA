
const products = [
  { name: "Potato", price: 20, image: "images/vegetable/potato.png" },
  { name: "Tomato", price: 30, image: "images/vegetable/tomato.png" },
  { name: "Onion", price: 28, image: "images/vegetable/onion.png" },
  { name: "Cucumber", price: 25, image: "images/vegetable/cucumber.png" },
  { name: "Lemon", price: 40, image: "images/vegetable/lemon.png" },
  { name: "Pumpkin", price: 18, image: "images/vegetable/pumpkin.png" },
  { name: "Brinjal", price: 35, image: "images/vegetable/brinjal.png" },
  { name: "Lady Finger", price: 32, image: "images/vegetable/lady_finger.png" },
  { name: "Green Chilli", price: 50, image: "images/vegetable/chilli.png" },
  { name: "Mushroom", price: 60, image: "images/vegetable/mushroom.png" }
];

const cart = {};

function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product, index) => {
    const item = document.createElement("div");
    item.className = "product-item";
    const quantity = cart[product.name] || 0;

    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}/kg</p>
      <div class="cart-controls" id="controls-${index}">
        ${
          quantity === 0
            ? `<button onclick="addToCart(${index})" class="add-btn">Add to Cart</button>`
            : `
            <button class="qty-btn" onclick="decreaseQty(${index})">-</button>
            <span>${quantity}</span>
            <button class="qty-btn" onclick="increaseQty(${index})">+</button>
          `
        }
      </div>
    `;
    productList.appendChild(item);
  });
}

function addToCart(index) {
  const product = products[index];
  cart[product.name] = 1;
  renderProducts();
  updateCartSummary();
}

function increaseQty(index) {
  const product = products[index];
  cart[product.name]++;
  renderProducts();
  updateCartSummary();
}

function decreaseQty(index) {
  const product = products[index];
  if (cart[product.name] > 1) {
    cart[product.name]--;
  } else {
    delete cart[product.name];
  }
  renderProducts();
  updateCartSummary();
}

function updateCartSummary() {
  const summaryBox = document.getElementById("cart-summary");
  const itemCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartIcon = document.getElementById("cart-icon");
  cartIcon.textContent = `🛒 ${itemCount}`;

  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  Object.entries(cart).forEach(([name, qty]) => {
    const li = document.createElement("li");
    li.textContent = `${name}: ${qty} kg`;
    cartList.appendChild(li);
  });

  summaryBox.style.display = itemCount > 0 ? "block" : "none";
}

function toggleCart() {
  const summaryBox = document.getElementById("cart-summary");
  summaryBox.style.display = summaryBox.style.display === "none" ? "block" : "none";
}

function placeOrder() {
  let message = "Hello, I would like to order:\n";
  Object.entries(cart).forEach(([name, qty]) => {
    message += `- ${name}: ${qty} kg\n`;
  });
  const whatsappUrl = `https://wa.me/918082753024?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
}

document.getElementById("cart-icon").addEventListener("click", toggleCart);
renderProducts();
