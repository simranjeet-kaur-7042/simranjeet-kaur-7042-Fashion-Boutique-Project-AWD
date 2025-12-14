// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const orderSummaryDiv = document.getElementById("orderSummary");

// Display cart items in checkout page
function loadCheckoutItems() {
  orderSummaryDiv.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement("p");
    div.textContent = `${item.name} - ₹${item.price} x ${item.quantity}`;
    orderSummaryDiv.appendChild(div);
    total += item.price * item.quantity;
  });

  // Add total at bottom
  const totalDiv = document.createElement("p");
  totalDiv.innerHTML = `<strong>Total: ₹${total}</strong>`;
  orderSummaryDiv.appendChild(totalDiv);
}

loadCheckoutItems();

// ----------------------
// Fake API Save Function
// ----------------------
async function saveToFakeAPI(orderData) {
  try {
    const response = await fetch("http://localhost:3000/orders"); // json-server endpoint
    const existingData = await response.json();

    // Add new order
    existingData.push(orderData);

    // Update JSON via PUT (json-server supports POST)
    await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData)
    });

    return true;
  } catch (err) {
    console.error("Error saving order:", err);
    alert("Failed to save order to fake API.");
    return false;
  }
}

// ----------------------
// Submit Checkout
// ----------------------
document.getElementById("checkoutForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const order = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    payment: document.getElementById("payment").value,
    items: cart,
    orderDate: new Date().toLocaleString()
  };

  const saved = await saveToFakeAPI(order);

  if (saved) {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  }
});
