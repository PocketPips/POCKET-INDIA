const products = [
  { id: 1, name: "Tomato", price: 30, image: "images/tomato.jpg" },
  { id: 2, name: "Onion", price: 25, image: "images/onion.jpg" },
];

const cart = {};

function updateCart() {
  let count = 0;
  let message = 'Hello! I want to order:\n';

  for (let id in cart) {
    count += cart[id].qty;
    message += `${cart[id].name} x${cart[id].qty}\n`;
  }

  document.getElementById("cart-count").innerText = `Cart: ${count} items`;

  const waURL = `https://wa.me/918082753024?text=${encodeURIComponent(message)}`;
  document.getElementById("whatsapp-btn").href = waURL;
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (cart[id]) {
    cart[id].qty += 1;
  } else {
    cart[id] = { ...product, qty: 1 };
  }

  document.getElementById(`btn-${id}`).innerText = `Added (${cart[id].qty})`;
  updateCart();
}

function loadProducts() {
  const container = document.getElementById("product-list");

  products.forEach(p => {
    const box = document.createElement("div");
    box.className = "product";

    box.innerHTML = `
      <img src="${p.image}" alt="${p.name}"/>
      <h3>${p.name}</h3>
      <p>₹${p.price}/kg</p>
      <button id="btn-${p.id}" class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
    `;

    container.appendChild(box);
  });
}

loadProducts();

