const itemsData = {
  vegetables: [
    { name: "Tomato", price: 20, img: "images/tomatoo.jpg" },
    { name: "Onion", price: 30, img: "images/-onions-background-photo.jpg" },
    // Add more up to 50+ items...
  ],
  fruits: [
    { name: "Apple", price: 120, img: "images/apple.png" },
    { name: "Banana", price: 40, img: "images/banana.png" },
    // Add more
  ],
  dairy: [
    { name: "Milk", price: 50, img: "images/milk.png" },
    { name: "Curd", price: 35, img: "images/curd.png" },
    // Add more
  ],
  snacks: [
    { name: "Chips", price: 20, img: "images/chips.png" },
    { name: "Biscuits", price: 25, img: "images/biscuits.png" },
    // Add more
  ],
  beverages: [
    { name: "Coke", price: 45, img: "images/coke.png" },
    { name: "Juice", price: 60, img: "images/juice.png" },
    // Add more
  ]
};

let cart = {};

function renderItems(category) {
  const section = document.getElementById('items');
  section.innerHTML = '';
  itemsData[category].forEach(item => {
    const count = cart[item.name] || 0;
    section.innerHTML += `
      <div class="item">
        <img src="${item.img}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <div class="cart-btns">
          ${count > 0 
            ? `<button onclick="decrement('${item.name}')">-</button><span>${count}</span><button onclick="increment('${item.name}', ${item.price}, '${item.img}')">+</button>`
            : `<button onclick="increment('${item.name}', ${item.price}, '${item.img}')">Add to Cart</button>`
          }
        </div>
      </div>
    `;
  });
}

function increment(name, price, img) {
  if (!cart[name]) cart[name] = 0;
  cart[name]++;
  renderItems(getCurrentCategory());
  updateCart();
}

function decrement(name) {
  if (cart[name]) {
    cart[name]--;
    if (cart[name] <= 0) delete cart[name];
    renderItems(getCurrentCategory());
    updateCart();
  }
}

function updateCart() {
  const cartList = document.getElementById('cartItems');
  const total = Object.entries(cart).reduce((sum, [name]) => {
    const category = Object.values(itemsData).flat().find(item => item.name === name);
    return sum + category.price * cart[name];
  }, 0);

  cartList.innerHTML = Object.entries(cart).map(([name, qty]) =>
    `<li>${name} x ${qty}</li>`
  ).join('');

  document.getElementById('totalPrice').textContent = `Total: ₹${total}`;
  document.getElementById('whatsappOrder').href = `https://wa.me/918082753024?text=I%20want%20to%20order:%0A` +
    Object.entries(cart).map(([name, qty]) => `${name} x ${qty}`).join('%0A') +
    `%0ATotal: ₹${total}`;
}

function toggleCart() {
  const popup = document.getElementById('cartPopup');
  popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

function getCurrentCategory() {
  return document.querySelector('.cat-btn.active')?.dataset.cat || 'vegetables';
}

document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderItems(btn.dataset.cat);
  });
});

// Default load
document.querySelector('[data-cat="vegetables"]').click();
