document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const CART_URL = "http://localhost:3000/cart";
  let currentProduct = null;

  const addToCartBtn = document.getElementById("addToCartBtn");

  async function loadProduct() {
    const res = await fetch(`http://localhost:3000/womenEshop/${productId}`);
    const product = await res.json();
    currentProduct = product;

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

    updateButtonState();
  }

  async function updateButtonState() {
    if (!currentProduct) return;
    try {
      const res = await fetch(`${CART_URL}?name=${encodeURIComponent(currentProduct.name)}`);
      const data = await res.json();

      if (data.length > 0) {
        addToCartBtn.textContent = "Added to Cart";
        addToCartBtn.style.backgroundColor = "#5fe17dff"; 
        addToCartBtn.style.color = "white";
      } else {
        addToCartBtn.textContent = "Add to Cart";
        addToCartBtn.style.backgroundColor = "#8a8b8dff"; 
        addToCartBtn.style.color = "white";
      }
    } catch (error) {
      console.error("Error checking cart:", error);
    }
  }

  addToCartBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!currentProduct) return;

    const productName = currentProduct.name;
    const productPrice = currentProduct.price;
    const productImage = currentProduct.MainImg;

    try {
      const res = await fetch(`${CART_URL}?name=${encodeURIComponent(productName)}`);
      const data = await res.json();

      if (data.length > 0) {

        const existing = data[0];
        await fetch(`${CART_URL}/${existing.id}`, { method: "DELETE" });
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
      }

      updateButtonState();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  });


  loadProduct();
});
