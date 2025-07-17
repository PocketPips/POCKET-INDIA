const products = [
  { id: 1, name: "Tomato", price: 20, image: "images/tomato.jpg" },
  { id: 2, name: "Onion", price: 30, image: "images/onion.jpg" }
];

const cart = {};

function updateCartDisplay(productId) {
  const counter = document.getElementById(`counter-${productId}`);
  if (cart[productId]) {
    counter.innerHTML = `
      <button onclick="removeFromCart(${productId})">-</button>
      <span>${cart[productId]}</span>
      <button onclick="addToCart(${productId})">+</button>
    `;
  } else {
    counter.innerHTML = `<button onclick="addToCart(${productId})">Add</button>`;
  }
}

function addToCart(productId) {
  cart[productId] = (cart[productId] || 0) + 1;
  updateCartDisplay(productId);
}

function removeFromCart(productId) {
  if (cart[productId] > 1) {
    cart[productId]--;
  } else {
    delete cart[productId];
  }
  updateCartDisplay(productId);
}

function renderProducts() {
  const list = document.getElementById("product-list");
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price} / kg</p>
      <div class="counter" id="counter-${p.id}">
        <button onclick="addToCart(${p.id})">Add</button>
      </div>
    `;
    list.appendChild(card);
  });
}

document.getElementById("whatsapp-order-btn").onclick = () => {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty!");
    return;
  }
  const message = Object.entries(cart)
    .map(([id, qty]) => {
      const product = products.find(p => p.id == id);
      return `${product.name} - ${qty} kg`;
    }).join("%0A");

  const whatsappURL = `https://wa.me/918082753024?text=🛒 Order for Pocket India:%0A${message}`;
  window.open(whatsappURL, '_blank');
};

renderProducts();


