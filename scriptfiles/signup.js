// Load form
const signupForm = document.getElementById("signupForm");

// Fake API endpoint (json-server)
const API_URL = "http://localhost:3000/users";

// Form validation & submission
signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const firstName = document.getElementById("first_name").value.trim();
  const lastName = document.getElementById("last_name").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;

  // --------------------------
  // Validation
  // --------------------------
  if (!/^[A-Za-z]{2,20}$/.test(firstName)) {
    alert("First name should contain only letters (2-20 characters).");
    return;
  }

  if (!/^[A-Za-z]{2,20}$/.test(lastName)) {
    alert("Last name should contain only letters (2-20 characters).");
    return;
  }

  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
    alert("Enter a valid email.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // --------------------------
  // Check existing user
  // --------------------------
  try {
    const response = await fetch(`${API_URL}?email=${email}`);
    const existingUsers = await response.json();

    if (existingUsers.length > 0) {
      alert("Email already registered. Please login.");
      return;
    }

    // --------------------------
    // Save new user
    // --------------------------
    const newUser = { firstName, lastName, email, password };
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });

    alert("Account created successfully!");
    signupForm.reset();
    window.location.href = "login.html";

  } catch (err) {
    console.error("Signup failed:", err);
    alert("Failed to signup. Check server or network.");
  }
});
