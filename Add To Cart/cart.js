const cartContainer = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const cartCountEl = document.getElementById('cart-count');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
  cartContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p class="empty">Your cart is empty 🛒</p>';
    totalPriceEl.textContent = '0';
    return;
  }

  cart.forEach((product, index) => {
    const div = document.createElement('div');
    div.classList.add('col-12', 'mb-4');
    const price = parseFloat(product.price);
    const quantity = product.quantity || 1;
    total += price * quantity;

    div.innerHTML = `
       <div class="card flex-row align-items-center">
    <img src="${product.image}" class="card-img-left" style="width: 200px; height: auto; object-fit: cover;" alt="${product.title}">
    <div class="card-body">
      <h5 class="card-title">${product.title}</h5>
      <p class="card-text" style="margin-top: 20px;">Price: $${product.price}</p>
      <div class="d-flex align-items-center mb-2">
        <button class="btn btn-sm btn-outline-secondary decrease" data-index="${index}">-</button>
        <span class="mx-2">${quantity}</span>
        <button class="btn btn-sm btn-outline-secondary increase" data-index="${index}">+</button>
      </div>
      <button class="btn btn-danger remove-btn" data-index="${index}">Remove</button>
    </div>
  </div>
    `;
    cartContainer.appendChild(div);
  });

  totalPriceEl.textContent = total.toFixed(2);
  localStorage.setItem('cart', JSON.stringify(cart));
  let totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  cartCountEl.textContent = totalItems;
}

cartContainer.addEventListener('click', function (e) {
  const index = e.target.dataset.index;
  if (e.target.classList.contains('remove-btn')) {
    cart.splice(index, 1);
    updateCart();
  }

  if (e.target.classList.contains('increase')) {
    cart[index].quantity = (cart[index].quantity || 1) + 1;
    updateCart();
  }

  if (e.target.classList.contains('decrease')) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
      updateCart();
    }
  }
});

updateCart();
