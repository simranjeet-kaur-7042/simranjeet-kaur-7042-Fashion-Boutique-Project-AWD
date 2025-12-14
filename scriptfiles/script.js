document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    const responseMsg = document.getElementById("responseMsg");

    // FORM VALIDATION
    if (name.length < 3) {
        responseMsg.textContent = "Name must be at least 3 characters!";
        responseMsg.style.color = "red";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        responseMsg.textContent = "Enter a valid email address!";
        responseMsg.style.color = "red";
        return;
    }

    if (phone.length < 10 || phone.length > 12) {
        responseMsg.textContent = "Phone number must be 10–12 digits!";
        responseMsg.style.color = "red";
        return;
    }

    if (message.length < 5) {
        responseMsg.textContent = "Message is too short!";
        responseMsg.style.color = "red";
        return;
    }

    // FAKE API POST REQUEST (JSON-SERVER)
    try {
        const res = await fetch("http://localhost:3000/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone, message })
        });

        if (res.ok) {
            responseMsg.textContent = "Message sent successfully!";
            responseMsg.style.color = "green";
            document.getElementById("contactForm").reset();
        } else {
            responseMsg.textContent = "Failed to send! Try again.";
            responseMsg.style.color = "red";
        }

    } catch (error) {
        responseMsg.textContent = "Server error! JSON server not running.";
        responseMsg.style.color = "red";
        console.log(error);
    }
});
