document.addEventListener("DOMContentLoaded", () => {
  const loginIcon = document.getElementById("loginIcon");

  loginIcon.addEventListener("click", (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(sessionStorage.getItem("activeUser"));

    if (currentUser) {
      const existingBox = document.getElementById("profileBox");
      if (existingBox) { existingBox.remove(); return; }

      const box = document.createElement("div");
      box.id = "profileBox";
      box.innerHTML = `
        <div style="
          position: fixed; top: 80px; right: 20px; background: #fff;
          border: 1px solid #ccc; border-radius: 10px; padding: 15px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 9999;
          font-family: 'Poppins', sans-serif; width: 220px; text-align:center;
          animation: slideDown 0.3s ease;">
          <h3 style="margin: 0 0 8px; font-size: 18px;">${currentUser.name}</h3>
          <p style="margin: 0 0 12px; font-size: 14px; color: gray;">${currentUser.email}</p>
          <button id="logoutBtn" style="
            background: #e63946; color: #fff; border: none;
            padding: 8px 14px; border-radius: 6px; cursor: pointer; font-size: 14px;">
            Logout
          </button>
        </div>
      `;
      document.body.appendChild(box);

      document.getElementById("logoutBtn").addEventListener("click", () => {
        sessionStorage.removeItem("activeUser");
        box.remove();
        alert("Logged out successfully!");
      });

      // Add small delay before enabling outside-click close
      setTimeout(() => {
        document.addEventListener("click", (event) => {
          if (!box.contains(event.target) && event.target !== loginIcon) {
            box.remove();
          }
        }, { once: true });
      }, 100);
    } else {
      window.location.href = "/loginpage.html";
    }
  });

  const style = document.createElement("style");
  style.textContent = `
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }`;
  document.head.appendChild(style);
});
