// Cart elements
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotalElem = document.getElementById("cart-total");
const cartCountElem = document.getElementById("cart-count"); // Element to show number of items

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render cart and counter
function renderCart() {
  cartItemsContainer.innerHTML = ""; //Clears previous cart items from the UI to avoid duplication.
  let total = 0;

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item"); //Adds CSS class for styling.

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

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to Cart buttons
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseInt(button.getAttribute("data-price"));

    //Searches cart for same product.
    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    renderCart();
    const cartToggle = document.getElementById("cart-toggle");
    if (cartToggle) cartToggle.checked = true;
  });
});

// Remove from cart
cartItemsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const index = e.target.getAttribute("data-index");
    cart.splice(index, 1);
    renderCart();
  }
});

renderCart();
