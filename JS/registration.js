const API_URL = "http://localhost:3000/users";
const result = document.getElementById("result");

document.getElementById("registrationform").addEventListener("submit", async(func) => {
    func.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    //? checking if user is already exist
    const res = await fetch(`${API_URL}?email=${email}`);
    const existing = await res.json();
    if (existing.length > 0) {
        result.style.color = "red";
        result.innerText = "User already exists!";
        return;
    }

    //? create new user
    const resCreate = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });

    if(resCreate.ok) {
        result.style.color = "green";
        result.innerText = "Signup successful! Redirecting...";

        setTimeout(() => {
            window.location.href = "loginpage.html";
        }, 1000);
        document.getElementById("registrationform").reset();

    } else {
        result.style.color = "red";
        result.innerText = "Signup failed. Try again.";
    }
});
