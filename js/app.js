const products = [
  "potato", "ridge_ground", "lady_finger", "lemon", "chilli", "cucumber",
  "mushroom", "brinjal", "pumpkin"
];

const cart = {};
const cartCount = document.getElementById("cart-count");
const productList = document.getElementById("product-list");

function renderProducts() {
  products.forEach(name => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="images/${name}.png" alt="${name}" />
      <p>${name.replace(/_/g, ' ').toUpperCase()}</p>
      <div id="controls-${name}">
        <button class="add-btn" onclick="addToCart('${name}')">Add to Cart</button>
      </div>
    `;
    productList.appendChild(div);
  });
}

function addToCart(name) {
  if (!cart[name]) cart[name] = 1;
  else cart[name]++;

  updateCartUI(name);
  updateCartCount();
}

function removeFromCart(name) {
  if (cart[name]) {
    cart[name]--;
    if (cart[name] <= 0) delete cart[name];
    updateCartUI(name);
    updateCartCount();
  }
}

function updateCartUI(name) {
  const controls = document.getElementById(`controls-${name}`);
  if (cart[name]) {
    controls.innerHTML = `
      <button class="qty-btn" onclick="removeFromCart('${name}')">-</button>
      <span class="qty-display">${cart[name]}</span>
      <button class="qty-btn" onclick="addToCart('${name}')">+</button>
    `;
  } else {
    controls.innerHTML = `
      <button class="add-btn" onclick="addToCart('${name}')">Add to Cart</button>
    `;
  }
}

function updateCartCount() {
  let total = 0;
  for (let item in cart) total += cart[item];
  cartCount.textContent = total;
}

function openWhatsAppOrder() {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "Hello! I want to order the following:\n";
  for (let item in cart) {
    message += `• ${item.replace(/_/g, ' ')} x ${cart[item]}\n`;
  }

  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = "8082753024";
  window.open(`https://wa.me/91${phoneNumber}?text=${encodedMessage}`, "_blank");
}

renderProducts();
