const products = [
  { name: 'Tomato', price: 30, img: 'images/tomatoo.jpg' },
  { name: 'Onion', price: 25, img: 'images/-onions-background-photo.jpg' },
  { name: 'Potato', price: 20, img: 'images/potato.jpg' }, // Add this image
];

const cart = {};

function renderProducts() {
  const list = document.getElementById('product-list');
  products.forEach((product, index) => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}/kg</p>
      <button onclick="addToCart(${index}, this)">Add</button>
    `;
    list.appendChild(div);
  });
}

function addToCart(index, button) {
  const product = products[index];
  if (!cart[product.name]) {
    cart[product.name] = { ...product, quantity: 1 };
  } else {
    cart[product.name].quantity++;
  }
  button.innerText = `Added (${cart[product.name].quantity})`;
}

document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = `Hello Pocket India,%0AI want to order:%0A`;
  let total = 0;

  for (let item in cart) {
    const qty = cart[item].quantity;
    const price = cart[item].price;
    total += qty * price;
    message += `• ${item} - ${qty}kg (₹${qty * price})%0A`;
  }
  message += `%0ATotal: ₹${total}%0AThank you!`;

  window.open(`https://wa.me/918082753024?text=${message}`, '_blank');
});

renderProducts();
