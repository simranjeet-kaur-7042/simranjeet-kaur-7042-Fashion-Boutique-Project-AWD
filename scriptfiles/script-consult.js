document
  .getElementById("consultForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const budget = document.getElementById("budget").value;
    const occasion = document.getElementById("occasion").value.trim();
    const stylePref = document.getElementById("stylePref").value.trim();
    const size = document.getElementById("size").value;
    const responseMsg = document.getElementById("responseMsg");

    
    if (fullName.length < 2) {
      responseMsg.textContent = "Name must be at least 2 letters";
      responseMsg.style.color = "red";
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      responseMsg.textContent = "Enter valid email";
      responseMsg.style.color = "red";
      return;
    }
    if (phone && (phone.length < 10 || phone.length > 13)) {
      responseMsg.textContent = "Phone must be 10-13 digits";
      responseMsg.style.color = "red";
      return;
    }
    if (!budget) {
      responseMsg.textContent = "Select your budget";
      responseMsg.style.color = "red";
      return;
    }
    if (!size) {
      responseMsg.textContent = "Select your size";
      responseMsg.style.color = "red";
      return;
    }

   
    try {
      const res = await fetch("http://localhost:3000/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          budget,
          occasion,
          stylePref,
          size,
        }),
      });

      if (res.ok) {
        responseMsg.textContent =
          "Consultation request submitted successfully!";
        responseMsg.style.color = "green";
        document.getElementById("consultForm").reset();
      } else {
        responseMsg.textContent = "Failed to submit. Try again!";
        responseMsg.style.color = "red";
      }
    } catch (err) {
      console.log(err);
      responseMsg.textContent =
        "Server error! Make sure JSON server is running.";
      responseMsg.style.color = "red";
    }
  });
