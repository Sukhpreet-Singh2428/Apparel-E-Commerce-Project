document.addEventListener("DOMContentLoaded", async () => {
    const CART_URL = "http://localhost:3000/cart";
    const cartContainer = document.getElementById("cartContainer");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");

    try {
        const res = await fetch(CART_URL);
        const cartItems = await res.json();

        cartContainer.innerHTML = ""; // Clear any content
        let total = 0;

        if (cartItems.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty 😔</p>";
            cartTotal.innerText = "₹0";
            cartCount.innerText = "0";
            return;
        }

        cartItems.forEach(item => {
            const priceNumber = Number(item.price.replace("₹",""));
            total += priceNumber * item.quantity;

            const productDiv = document.createElement("div");
            productDiv.className = "cart-item";
            productDiv.innerHTML = `
                <div class="pic">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="detail">
                    <div class="price">
                        <div class="about">
                            <div class="name"><p>${item.name}</p></div>
                            <div class="description"><p>${item.description || "No description available"}</p></div>
                        </div>
                        <div class="cost"><p>₹${priceNumber}</p></div>
                    </div>
                    <div class="quantity">
                        <p>Quantity: 
                            <img src="https://img.icons8.com/material-rounded/24/000000/minus.png" class="decrease" data-id="${item.id}">
                            ${item.quantity}
                            <img src="https://img.icons8.com/material-rounded/24/000000/plus.png" class="increase" data-id="${item.id}">
                        </p>
                        <p><button class="remove" data-id="${item.id}">Remove</button></p>
                    </div>
                </div>
            `;
            cartContainer.appendChild(productDiv);
        });

        cartTotal.innerText = `₹${total}`;
        cartCount.innerText = cartItems.length;

        // Add event listeners for increase, decrease, remove
        cartContainer.addEventListener("click", async (e) => {
            const id = e.target.dataset.id;
            if (!id) return;

            const item = cartItems.find(i => i.id == id);
            if (!item) return;

            if (e.target.classList.contains("increase")) {
                await fetch(`${CART_URL}/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ quantity: item.quantity + 1 })
                });
            }

            if (e.target.classList.contains("decrease")) {
                const newQty = item.quantity - 1;
                if (newQty > 0) {
                    await fetch(`${CART_URL}/${id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ quantity: newQty })
                    });
                } else {
                    await fetch(`${CART_URL}/${id}`, { method: "DELETE" });
                }
            }

            if (e.target.classList.contains("remove")) {
                await fetch(`${CART_URL}/${id}`, { method: "DELETE" });
            }

            // Reload cart after any change
            window.location.reload();
        });

    } catch (error) {
        console.error("Error fetching cart:", error);
    }
});
