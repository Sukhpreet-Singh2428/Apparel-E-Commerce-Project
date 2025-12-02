
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // ---------- ALERT + BUTTON TEXT CHANGE ----------
  const alertButtons = document.querySelectorAll('.alert-btn1, .alert-btn2');

  alertButtons.forEach(button => {
    button.addEventListener('click', () => {
      alert("Reminder is set");

      // Change button text
      button.innerHTML = '<i class="icon-bell"></i> Reminder Set';

      // Optional: Disable button to prevent clicking again
      // button.disabled = true;
      // button.style.opacity = 0.6;
      // button.style.cursor = "not-allowed";
    });
  });

