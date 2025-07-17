const cart = [];
const cartListEl = document.getElementById('cart-list');
const cartTotalEl = document.getElementById('cart-total');
const cartCountEl = document.getElementById('cart-count');
const sidebar = document.getElementById('cart-sidebar');
document.getElementById('cart-toggle').onclick = () =>
  sidebar.classList.toggle('open');

function addToCart(name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) existing.qty++;
  else cart.push({ name, price, qty: 1 });
  updateCartUI();
  sidebar.classList.add('open');
}

function updateCartUI() {
  cartListEl.innerHTML = '';
  let total = 0;
  let count = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.qty} — ₹${item.qty * item.price}`;
    cartListEl.appendChild(li);
    total += item.qty * item.price;
    count += item.qty;
  });
  cartTotalEl.textContent = `Total: ₹${total}`;
  cartCountEl.textContent = count;
}

function sendOrderToWhatsApp() {
  if (cart.length === 0) { alert('Your cart is empty!'); return; }

  let message = '*New Order – POCKET INDIA*%0A%0A';
  cart.forEach(item => {
    message += `• ${item.name} x${item.qty} = ₹${item.qty * item.price}%0A`;
  });
  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);
  message += `%0A*Total: ₹${total}*`;

  const phone = '918082753024';
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

function scrollIntoProducts() {
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}
