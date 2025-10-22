// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Filter toggle
const filterToggle = document.getElementById('filterToggle');
const sidebar = document.getElementById('sidebar');

filterToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    filterToggle.textContent = sidebar.classList.contains('active') ? 'Hide Filters' : 'Show Filters';
});