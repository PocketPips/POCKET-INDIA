document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const cartIcon = document.querySelector(".cart-icon");
  const cartCount = document.getElementById("cart-count");

  const cart = {};

  const products = [
    { name: "Potato", image: "images/potato.jpg", price: 20 },
    { name: "Ridge Gourd", image: "images/ridge_ground.jpg", price: 30 },
    { name: "Lady Finger", image: "images/lady_finger.jpg", price: 25 },
    { name: "Lemon", image: "images/lemon.jpg", price: 40 },
    { name: "Chilli", image: "images/chilli.jpg", price: 60 },
    { name: "Cucumber", image: "images/cucumber.jpg", price: 35 },
    { name: "Mushroom", image: "images/mushroom.jpg", price: 80 },
    { name: "Brinjal", image: "images/brinjal.jpg", price: 30 },
    { name: "Pumpkin", image: "images/pumpkin.jpg", price: 20 }
  ];

  function renderProducts() {
    productList.innerHTML = "";
    products.forEach((product, index) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>₹${product.price} /kg</p>
        <div id="controls-${index}">
          <button onclick="addToCart(${index})">Add to Cart</button>
        </div>
      `;
      productList.appendChild(productCard);
    });
  }

  window.addToCart = function (index) {
    const product = products[index];
    if (!cart[product.name]) cart[product.name] = 0;
    cart[product.name]++;
    updateCartCount();
    updateControls(index);
  };

  function removeFromCart(index) {
    const product = products[index];
    if (cart[product.name] > 0) cart[product.name]--;
    if (cart[product.name] === 0) delete cart[product.name];
    updateCartCount();
    updateControls(index);
  }

  function updateControls(index) {
    const product = products[index];
    const container = document.getElementById(`controls-${index}`);
    const count = cart[product.name] || 0;

    if (count === 0) {
      container.innerHTML = `<button onclick="addToCart(${index})">Add to Cart</button>`;
    } else {
      container.innerHTML = `
        <div class="qty-controls">
          <button onclick="removeFromCart(${index})">-</button>
          <span>${count}</span>
          <button onclick="addToCart(${index})">+</button>
        </div>
      `;
    }
  }

  function updateCartCount() {
    let total = 0;
    Object.values(cart).forEach((qty) => (total += qty));
    cartCount.textContent = total;
  }

  // Cart modal
  const modal = document.createElement("div");
  modal.classList.add("cart-modal");
  document.body.appendChild(modal);

  cartIcon.addEventListener("click", () => {
    modal.innerHTML = `<h3>Your Cart</h3>`;
    Object.keys(cart).forEach((item) => {
      modal.innerHTML += `<div class="cart-item">${item} × ${cart[item]}</div>`;
    });

    modal.innerHTML += `<button class="order-btn" onclick="placeOrder()">Place Order on WhatsApp</button>`;
    modal.style.display = modal.style.display === "block" ? "none" : "block";
  });

  window.placeOrder = function () {
    const items = Object.keys(cart).map(
      (item) => `${item} x ${cart[item]}`
    ).join("%0A");
    const message = `Hello,%0AI want to order:%0A${items}`;
    window.open(`https://wa.me/918082753024?text=${message}`);
  };

  renderProducts();
});
