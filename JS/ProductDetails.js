document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const CART_URL = "http://localhost:3000/cart";
  let currentProduct = null;

  async function loadProduct() {
    const res = await fetch(`http://localhost:3000/products/${productId}`);
    const product = await res.json();
    currentProduct = product;

    // Fill data
    document.getElementById("MainImg").src = product.MainImg;
    document.getElementById("sideImg1").src = product.sideImg1;
    document.getElementById("sideImg2").src = product.sideImg2;
    document.getElementById("sideImg3").src = product.sideImg3;
    document.getElementById("sideImg4").src = product.sideImg4;
    document.getElementById("productName").textContent = product.name;
    document.getElementById("info").textContent = product.info;
    document.getElementById("productPrice").textContent = product.price;
    document.getElementById("productVendor").textContent = product.productVendor;
    document.getElementById("vid1").src = product.vid1;
    document.getElementById("vid2").src = product.vid2;
    document.getElementById("review").textContent = product.review;

    const sizeSpans = document.querySelectorAll(".sizes span");
    const sizes = [product.size1, product.size2, product.size3, product.size4, product.size5];
    sizes.forEach((s, i) => {
      if (sizeSpans[i]) sizeSpans[i].textContent = s;
    });
  }

  document.getElementById("addToCartBtn").addEventListener("click", async (e) => {
    e.preventDefault();
    if (!currentProduct) return;

    const productName = currentProduct.name;
    const productPrice = currentProduct.price;
    const productImage = currentProduct.MainImg;

    try {
      const res = await fetch(`${CART_URL}?name=${encodeURIComponent(productName)}`);
      const data = await res.json();
      let messageText = "";

      if (data.length > 0) {
        const existing = data[0];
        const newQuantity = (existing.quantity || 1) + 1;

        await fetch(`${CART_URL}/${existing.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: newQuantity })
        });

        messageText = `✅ Quantity updated to ${newQuantity}!`;
      } else {
        const newProduct = {
          id: currentProduct.id,
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1
        };

        await fetch(CART_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct)
        });

        messageText = "✅ Added to cart successfully!";
      }

      const msg = document.createElement("div");
      msg.textContent = messageText;
      msg.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #222;
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 16px;
        z-index: 9999;
      `;
      document.body.appendChild(msg);
      setTimeout(() => {
        msg.style.opacity = "0";
        setTimeout(() => msg.remove(), 1000);
      }, 4000); 
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Something went wrong! Check console.");
    }
  });

  loadProduct();
});
