let cart = JSON.parse(localStorage.getItem("cart")) || [];
const orderSummaryDiv = document.getElementById("orderSummary");

// Display cart items 
function loadCheckoutItems() {
  orderSummaryDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
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

async function saveToFakeAPI(orderData) {
  try {
    const response = await fetch("http://localhost:3000/orders"); //get data
    const existingData = await response.json();
    existingData.push(orderData);

    await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    return true;
  } catch (err) {
    console.error("Error saving order:", err);
    alert("Failed to save order to fake API.");
    return false;
  }
}

// Submit Checkout
document
  .getElementById("checkoutForm")
  .addEventListener("submit", async function (e) {
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
      orderDate: new Date().toLocaleString(),
    };

    const saved = await saveToFakeAPI(order);

    if (saved) {
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      window.location.href = "index.html";
    }
  });
