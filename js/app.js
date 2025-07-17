const products = [
  { name: "Potato", price: 30, image: "images/potato.jpg" },
  { name: "Ridge Gourd", price: 40, image: "images/ridge_ground.jpg" },
  { name: "Lady Finger", price: 35, image: "images/lady_finger.jpg" },
  { name: "Lemon", price: 60, image: "images/lemon.jpg" },
  { name: "Chilli", price: 50, image: "images/chilli.jpg" },
  { name: "Cucumber", price: 25, image: "images/cucumber.jpg" },
  { name: "Mushroom", price: 80, image: "images/mushroom.jpg" },
  { name: "Brinjal", price: 30, image: "images/brinjal.jpg" },
  { name: "Pumpkin", price: 20, image: "images/pumpkin.jpg" }
];

const cart = {};
const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartSummary = document.getElementById("cart-summary");
const whatsappBtn = document.getElementById("whatsapp-order");

function updateCartDisplay() {
  let totalItems = 0;
  cartItems.innerHTML = "";

  for (const [name, { price, qty }] of Object.entries(cart)) {
    totalItems += qty;
    const li = document.createElement("li");
    li.textContent = `${name} x ${qty} = ₹${qty * price}`;
    cartItems.appendChild(li);
  }

  cartCount.textContent = totalItems;

  if (totalItems > 0) {
    cartSummary.classList.remove("hidden");

    const message = Object.entries(cart)
      .map(([name, { qty }]) => `${name} x ${qty}`)
      .join("%0A");
    whatsappBtn.href = `https://wa.me/918082753024?text=Hi%20Pocket%20India,%20I%20want%20to%20order:%0A${message}`;
  } else {
    cartSummary.classList.add("hidden");
  }
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p>₹${product.price}/kg</p>
    <div class="cart-controls">
      <button onclick="removeFromCart('${product.name}')">-</button>
      <span id="qty-${product.name}">0</span>
      <button onclick="addToCart('${product.name}', ${product.price})">+</button>
    </div>
  `;

  return card;
}

function addToCart(name, price) {
  if (!cart[name]) {
    cart[name] = { qty: 0, price };
  }
  cart[name].qty++;
  document.getElementById(`qty-${name}`).textContent = cart[name].qty;
  updateCartDisplay();
}

function removeFromCart(name) {
  if (cart[name]) {
    cart[name].qty--;
    if (cart[name].qty <= 0) {
      delete cart[name];
      document.getElementById(`qty-${name}`).textContent = 0;
    } else {
      document.getElementById(`qty-${name}`).textContent = cart[name].qty;
    }
    updateCartDisplay();
  }
}

function toggleCart() {
  cartSummary.classList.toggle("hidden");
}

products.forEach(product => {
  productList.appendChild(createProductCard(product));
});
