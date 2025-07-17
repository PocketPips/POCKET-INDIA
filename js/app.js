const cart = {};
const buttons = document.querySelectorAll(".add-btn");

buttons.forEach((btn) => {
  const productId = btn.dataset.id;
  cart[productId] = 0;

  btn.addEventListener("click", () => {
    cart[productId]++;
    btn.innerText = `Added (${cart[productId]})`;
    updateWhatsAppLink();
  });
});

function updateWhatsAppLink() {
  let message = "Order from Pocket India:%0A";
  for (let item in cart) {
    if (cart[item] > 0) {
      message += `• ${item} x ${cart[item]}%0A`;
    }
  }
  const phoneNumber = "8082753024";
  const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  document.getElementById("checkout-link").href = waUrl;
}