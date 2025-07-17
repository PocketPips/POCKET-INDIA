const products = [
  { name: "Potato", price: 30, image: "images/potato.jpg" },
  { name: "Ridge Gourd", price: 40, image: "images/ridge_ground.jpg" },
  { name: "Lady Finger", price: 35, image: "images/lady_finger.jpg" },
  { name: "Lemon", price: 25, image: "images/lemon.jpg" },
  { name: "Chilli", price: 20, image: "images/chilli.jpg" },
  { name: "Cucumber", price: 28, image: "images/cucumber.jpg" },
  { name: "Mushroom", price: 80, image: "images/mushroom.jpg" },
  { name: "Brinjal", price: 35, image: "images/brinjal.jpg" },
  { name: "Pumpkin", price: 18, image: "images/pumpkin.jpg" },
  { name: "Ridge Gourd 2", price: 38, image: "images/ridge_ground_01.jpg" }
];

let cart = {};
const cartCountEl = document.getElementById("cart-count");
const productList = document.getElementById("product-list");

function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price} / kg</p>
      <button class="add-btn" onclick="addToCart(${index})">Add</button>
    `;
    productList.appendChild(card);
  });
}

function addToCart(index) {
  const product = products[index];
  cart[product.name] = (cart[product.name] || 0) + 1;

  updateCartCount();
  sendToWhatsApp();
}

function updateCartCount() {
  let totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  cartCountEl.textContent = totalItems;
}

function sendToWhatsApp() {
  const phoneNumber = "8082753024";
  let message = "🛒 *Pocket India Order*\n\n";

  Object.entries(cart).forEach(([item, qty]) => {
    message += `• ${item} x ${qty}\n`;
  });

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
}

renderProducts();
