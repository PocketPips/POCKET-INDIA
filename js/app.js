const products = [
  { name: "Potato", image: "images/potato.jpg", price: 20 },
  { name: "Ridge Gourd", image: "images/ridge_ground.jpg", price: 25 },
  { name: "Lady Finger", image: "images/lady_finger.jpg", price: 22 },
  { name: "Lemon", image: "images/lemon.jpg", price: 18 },
  { name: "Chilli", image: "images/chilli.jpg", price: 30 },
  { name: "Cucumber", image: "images/cucumber.jpg", price: 24 },
  { name: "Mushroom", image: "images/mushroom.jpg", price: 40 },
  { name: "Brinjal", image: "images/brinjal.jpg", price: 26 },
  { name: "Pumpkin", image: "images/pumpkin.jpg", price: 28 },
  { name: "Ridge Gourd 01", image: "images/ridge_ground_01.jpg", price: 27 }
];

let cart = {};

function renderProducts() {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  products.forEach((item, index) => {
    const qty = cart[item.name] || 0;

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>₹${item.price}/kg</p>
      <div class="cart-actions">
        <button onclick="decreaseQty('${item.name}')">-</button>
        <span class="quantity-display" id="qty-${index}">${qty}</span>
        <button onclick="increaseQty('${item.name}', ${index})">+</button>
      </div>
    `;
    container.appendChild(card);
  });

  updateCartCount();
}

function increaseQty(name, index) {
  cart[name] = (cart[name] || 0) + 1;
  document.getElementById(`qty-${index}`).innerText = cart[name];
  updateCartCount();
}

function decreaseQty(name) {
  if (cart[name]) {
    cart[name]--;
    if (cart[name] === 0) delete cart[name];
    renderProducts();
  }
}

function updateCartCount() {
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  document.getElementById("cart-count").innerText = count;
}

window.onload = renderProducts;

