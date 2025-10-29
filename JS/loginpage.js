const API_URL = "http://localhost:3000/users";
const result = document.getElementById("result");

document.getElementById("loginform").addEventListener("submit", async (func) => {
    func.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const res = await fetch(`${API_URL}?email=${email}&password=${password}`);
    const users = await res.json();

    if (users.length > 0) {
        const user = users[0];
        sessionStorage.setItem("activeUser", JSON.stringify(user));
        result.style.color = "green";
        result.innerText = `Welcome back, ${users[0].name}! Redirecting...`;

        setTimeout(() => {
            window.location.href = "TheMan.html";
        }, 1000);
    }
    else {
        result.style.color = "red";
        result.innerText = "Invaild email or password";
    }
});