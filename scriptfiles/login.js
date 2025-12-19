const loginForm = document.getElementById("loginForm");

function validateEmail(email) {
  const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  return re.test(email);
}
function validatePassword(password) {
  return password.length >= 6;
}

async function getUserByEmail(email) {
  try {
    const response = await fetch(`http://localhost:3000/users?email=${email}`);
    const data = await response.json();//Convert API response to JS obj.
    return data.length > 0 ? data[0] : null;
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
}

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = loginForm.email.value.trim().toLowerCase();
  const password = loginForm.password.value.trim();

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!validatePassword(password)) {
    alert("Password must be at least 6 characters.");
    return;
  }

  // Fetch user from API
  const user = await getUserByEmail(email);
  if (!user) {
    alert("User not found! Please sign up.");
    return;
  }

  if (user.password !== password) {
    alert("Incorrect password.");
    return;
  }

  alert(`Welcome back, ${user.firstName}!`);
  localStorage.setItem("loggedInUser", JSON.stringify(user)); 
  window.location.href = "index.html";
});
