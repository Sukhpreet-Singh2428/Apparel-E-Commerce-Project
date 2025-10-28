document.querySelectorAll('.view-btn').forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.getAttribute('data-id');
    window.location.href = `ProductDetails.html?id=${productId}`;
  });
});
