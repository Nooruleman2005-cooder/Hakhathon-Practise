const cartCountEl = document.getElementById('cart-count');
const cart = JSON.parse(localStorage.getItem('cart')) || [];

if (cartCountEl) {
  let totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  cartCountEl.textContent = totalItems;
}
