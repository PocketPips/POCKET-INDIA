// js/app.js

const cart = {};
const cartIcon = document.getElementById('cart-count');

function updateCartIcon() {
  let totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  cartIcon.textContent = totalItems;
}

function increaseQty(id) {
  if (!cart[id]) cart[id] = 1;
  else cart[id]++;
  updateUI(id);
  updateCartIcon();
}

function decreaseQty(id) {
  if (cart[id]) {
    cart[id]--;
    if (cart[id] <= 0) delete cart[id];
  }
  updateUI(id);
  updateCartIcon();
}

function updateUI(id) {
  const btn = document.getElementById(`btn-${id}`);
  const qtyBox = document.getElementById(`qty-${id}`);
  if (cart[id]) {
    btn.style.display = 'none';
    qtyBox.style.display = 'flex';
    qtyBox.querySelector('.qty').textContent = cart[id];
  } else {
    btn.style.display = 'inline-block';
    qtyBox.style.display = 'none';
  }
}

document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.id;
    increaseQty(id);
  });
});

document.querySelectorAll('.plus-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.id;
    increaseQty(id);
  });
});

document.querySelectorAll('.minus-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.id;
    decreaseQty(id);
  });
});

// Optional image carousel (if you want rotating product images)
let sliders = document.querySelectorAll('.slider-img');
sliders.forEach(slider => {
  const baseName = slider.dataset.base;
  let index = 1;
  setInterval(() => {
    index = index === 2 ? 1 : 2;
    slider.src = `images/${baseName}_${index}.jpg`;
  }, 3000);
});
