document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const CART_URL = "http://localhost:3000/cart";
  let currentProduct = null;
  let selectedSize = null;

  const addToCartBtn = document.getElementById("addToCartBtn");
  const sizeSpans = document.querySelectorAll(".sizes span");

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

    const sizes = [product.size1, product.size2, product.size3, product.size4, product.size5];
    sizes.forEach((s, i) => {
      if (sizeSpans[i]) {
        sizeSpans[i].textContent = s;
        // Add click event to each size
        sizeSpans[i].addEventListener("click", () => selectSize(s, sizeSpans[i]));
      }
    });

    updateButtonState();
  }

  function selectSize(size, element) {
    selectedSize = size;
    
    // Remove active class from all size spans
    sizeSpans.forEach(span => {
      span.style.backgroundColor = "";
      span.style.color = "";
      span.style.fontWeight = "";
    });
    
    // Add active styling to selected size
    element.style.backgroundColor = "black";
    element.style.color = "white";
    element.style.fontWeight = "bold";
  }

  async function updateButtonState() {
    if (!currentProduct) return;
    try {
      const res = await fetch(`${CART_URL}?name=${encodeURIComponent(currentProduct.name)}`);
      const data = await res.json();

      if (data.length > 0) {
        addToCartBtn.textContent = "Added to Cart ✓";
        addToCartBtn.style.backgroundColor = "#5fe17dff"; 
        addToCartBtn.style.color = "white";
        
        // Set the selected size if product is already in cart
        const cartItem = data[0];
        if (cartItem.size) {
          sizeSpans.forEach(span => {
            if (span.textContent === cartItem.size) {
              selectSize(cartItem.size, span);
            }
          });
        }
      } else {
        addToCartBtn.innerHTML = 'Add to Cart <img src="https://img.icons8.com/?size=100&id=IWVgm1EZH963&format=png&color=000000" style="height: 1.2rem;">';
        addToCartBtn.style.backgroundColor = "lightgray"; 
        addToCartBtn.style.color = "black";
      }
    } catch (error) {
      console.error("Error checking cart:", error);
    }
  }

  addToCartBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!currentProduct) return;

    // Check if size is selected
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }

    const productName = currentProduct.name;
    const productPrice = currentProduct.price;
    const productImage = currentProduct.MainImg;

    try {
      const res = await fetch(`${CART_URL}?name=${encodeURIComponent(productName)}`);
      const data = await res.json();

      if (data.length > 0) {
        // Remove from cart
        const existing = data[0];
        await fetch(`${CART_URL}/${existing.id}`, { method: "DELETE" });
        
        // Reset selected size
        selectedSize = null;
        sizeSpans.forEach(span => {
          span.style.backgroundColor = "";
          span.style.color = "";
          span.style.fontWeight = "";
        });
      } else {
        // Add to cart with selected size
        const newProduct = {
          id: currentProduct.id,
          name: productName,
          price: productPrice,
          image: productImage,
          size: selectedSize,
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

  // Add click functionality to side images to change main image
  document.getElementById("sideImg1")?.parentElement.addEventListener("click", () => {
    document.getElementById("MainImg").src = document.getElementById("sideImg1").src;
  });
  document.getElementById("sideImg2")?.parentElement.addEventListener("click", () => {
    document.getElementById("MainImg").src = document.getElementById("sideImg2").src;
  });
  document.getElementById("sideImg3")?.parentElement.addEventListener("click", () => {
    document.getElementById("MainImg").src = document.getElementById("sideImg3").src;
  });
  document.getElementById("sideImg4")?.parentElement.addEventListener("click", () => {
    document.getElementById("MainImg").src = document.getElementById("sideImg4").src;
  });

  loadProduct();
});