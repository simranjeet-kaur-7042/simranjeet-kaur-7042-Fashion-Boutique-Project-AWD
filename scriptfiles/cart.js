// // Select elements
// const cartItemsContainer = document.querySelector('.cart-items');
// const cartTotalElem = document.getElementById('cart-total');

// // Load cart from localStorage or initialize
// let cart = JSON.parse(localStorage.getItem('cart')) || [];

// // Function to render cart
// function renderCart() {
//   cartItemsContainer.innerHTML = '';
//   let total = 0;

//   cart.forEach((item, index) => {
//     const cartItem = document.createElement('div');
//     cartItem.classList.add('cart-item');

//     cartItem.innerHTML = `
//       <p>${item.name} - ₹${item.price} x ${item.quantity}</p>
//       <button class="remove-btn" data-index="${index}">Remove</button>
//     `;

//     cartItemsContainer.appendChild(cartItem);
//     total += item.price * item.quantity;
//   });

//   cartTotalElem.textContent = `Total: ₹${total}`;
//   localStorage.setItem('cart', JSON.stringify(cart));
// }

// // Add event listener to "Add to Cart" buttons
// document.querySelectorAll('.add-to-cart').forEach(button => {
//   button.addEventListener('click', () => {
//     const name = button.getAttribute('data-name');
//     const price = parseInt(button.getAttribute('data-price'));

//     // Check if item already exists in cart
//     const existingItem = cart.find(item => item.name === name);
//     if (existingItem) {
//       existingItem.quantity += 1;
//     } else {
//       cart.push({ name, price, quantity: 1 });
//     }

//     renderCart();

//     // Open cart sidebar automatically
//     document.getElementById('cart-toggle').checked = true;
//   });
// });

// // Remove item from cart
// cartItemsContainer.addEventListener('click', (e) => {
//   if (e.target.classList.contains('remove-btn')) {
//     const index = e.target.getAttribute('data-index');
//     cart.splice(index, 1);
//     renderCart();
//   }
// });



// // Initial render on page load
// renderCart();



// ----------------------
// Cart elements
// ----------------------
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElem = document.getElementById('cart-total');
const cartCountElem = document.getElementById('cart-count'); // Element to show number of items

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ----------------------
// Render cart and counter
// ----------------------
function renderCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    cartItem.innerHTML = `
      <p>${item.name} - ₹${item.price} x ${item.quantity}</p>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;

    cartItemsContainer.appendChild(cartItem);
    total += item.price * item.quantity;
  });

  cartTotalElem.textContent = `Total: ₹${total}`;

  // Update cart counter
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCountElem) cartCountElem.textContent = totalItems;

  localStorage.setItem('cart', JSON.stringify(cart));
}

// ----------------------
// Add to Cart buttons
// ----------------------
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseInt(button.getAttribute('data-price'));

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    renderCart();

    // Optional: open cart sidebar automatically
    const cartToggle = document.getElementById('cart-toggle');
    if (cartToggle) cartToggle.checked = true;
  });
});

// ----------------------
// Remove from cart
// ----------------------
cartItemsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const index = e.target.getAttribute('data-index');
    cart.splice(index, 1);
    renderCart();
  }
});

// Initial render
renderCart();
