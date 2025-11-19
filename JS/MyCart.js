// document.addEventListener("DOMContentLoaded", async () => {
//     const CART_URL = "http://localhost:3000/cart";
//     const cartContainer = document.getElementById("cartContainer");
//     const cartTotal = document.getElementById("cartTotal");
//     const cartCount = document.getElementById("cartCount");

//     try {
//         const res = await fetch(CART_URL);
//         const cartItems = await res.json();

//         cartContainer.innerHTML = ""; 
//         let total = 0;

//         if (cartItems.length === 0) {
//             cartContainer.innerHTML = "<p>Your cart is empty</p>";
//             cartTotal.innerText = "₹0";
//             cartCount.innerText = "0";
//             return;
//         }

//         cartItems.forEach(item => {
//             const priceNumber = Number(item.price.replace(/[₹,]/g, "")); 
//             total += priceNumber * item.quantity;

//             const productDiv = document.createElement("div");
//             productDiv.className = "cart-item";
//             productDiv.innerHTML = `
//                 <div class="pic">
//                     <img src="${item.image}" alt="${item.name}">
//                 </div>
//                 <div class="detail">
//                     <div class="price">
//                         <div class="about">
//                             <div class="name"><p>${item.name}</p></div>
//                         </div>
//                         <div class="cost"><p>₹${priceNumber}</p></div>
//                     </div>
//                 </div>
//                 <div class="quantity">
//                     <p>
//                         <img src="https://img.icons8.com/material-outlined/24/000000/minus--v1.png" class="decrease" data-id="${item.id}">
//                         ${item.quantity}
//                         <img src="https://img.icons8.com/material-outlined/24/000000/plus--v1.png" class="increase" data-id="${item.id}">
//                     </p>
//                     <p><button class="remove" data-id="${item.id}">Remove</button></p>
//                 </div>
//             `;
//             cartContainer.appendChild(productDiv);
//         });

//         cartTotal.innerText = `₹${total}`;
//         cartCount.innerText = cartItems.length;

        
//         cartContainer.addEventListener("click", async (e) => {
//             const id = e.target.dataset.id;
//             if (!id) return;

//             const item = cartItems.find(i => i.id == id);
//             if (!item) return;

//             if (e.target.classList.contains("increase")) {
//                 await fetch(`${CART_URL}/${id}`, {
//                     method: "PATCH",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ quantity: item.quantity + 1 })
//                 });
//             }

//             if (e.target.classList.contains("decrease")) {
//                 const newQty = item.quantity - 1;
//                 if (newQty > 0) {
//                     await fetch(`${CART_URL}/${id}`, {
//                         method: "PATCH",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify({ quantity: newQty })
//                     });
//                 } else {
//                     await fetch(`${CART_URL}/${id}`, { method: "DELETE" });
//                 }
//             }

//             if (e.target.classList.contains("remove")) {
//                 await fetch(`${CART_URL}/${id}`, { method: "DELETE" });
//             }

//             window.location.reload();
//         });

//     } catch (error) {
//         console.error("Error fetching cart:", error);
//     }
// });


// //? Place order : 
// const API_USERS = "http://localhost:3000/users";
// const API_CART = "http://localhost:3000/cart";
// const API_ORDERS = "http://localhost:3000/orders";

// const paymentModal = document.getElementById("paymentModal");
// const payNowBtn = document.getElementById("payNowBtn");
// const closePaymentBtn = document.getElementById("closePaymentBtn");

// document.getElementById("placeOrderBtn").addEventListener("click", async () => {
//     // const user = JSON.parse(sessionStorage.getItem("activeUser"));

//     // if (!user) {
//     //     alert("Please login first!");
//     //     return window.location.href = "loginpage.html";
//     // }

//     // show payment window
//     paymentModal.classList.remove("hidden");
// });

// // Close button
// closePaymentBtn.addEventListener("click", () => {
//   paymentModal.classList.add("hidden");
// });

// // Pay Now button = actual order creation
// payNowBtn.addEventListener("click", async () => {
//     const user = JSON.parse(sessionStorage.getItem("activeUser"));

//     // 1. Fetch cart items
//     const cartRes = await fetch(`${API_CART}?userId=${user.id}`);
//     const items = await cartRes.json();

//     if (items.length === 0) {
//         alert("Cart is empty!");
//         return;
//     }

//     // 2. Create order object
//     const newOrder = {
//         userId: user.id,
//         items,
//         date: new Date().toISOString(),
//         totalAmount: items.reduce((sum, i) => sum + i.price * i.quantity, 0)
//     };

//     // 3. Store order in JSON (POST)
//     await fetch(API_ORDERS, {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(newOrder)
//     });

//     // 4. Clear cart
//     for (let item of items) {
//         await fetch(`${API_CART}/${item.id}`, { method: "DELETE" });
//     }

//     paymentModal.classList.add("hidden");

//     alert("🎉 Payment Successful! Order Placed.");

//     window.location.href = "orderSuccess.html"; // optional success page
// });


document.addEventListener("DOMContentLoaded", async () => {
    const CART_URL = "http://localhost:3000/cart";
    const cartContainer = document.getElementById("cartContainer");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");

    try {
        const res = await fetch(CART_URL);
        const cartItems = await res.json();

        cartContainer.innerHTML = ""; 
        let total = 0;

        if (cartItems.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty</p>";
            cartTotal.innerText = "₹0";
            cartCount.innerText = "0";
            return;
        }

        cartItems.forEach(item => {
            const priceNumber = Number(item.price.replace(/[₹,]/g, "")); 
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
                        </div>
                        <div class="cost"><p>₹${priceNumber}</p></div>
                    </div>
                </div>
                <div class="quantity">
                    <p>
                        <img src="https://img.icons8.com/material-outlined/24/000000/minus--v1.png" class="decrease" data-id="${item.id}">
                        ${item.quantity}
                        <img src="https://img.icons8.com/material-outlined/24/000000/plus--v1.png" class="increase" data-id="${item.id}">
                    </p>
                    <p><button class="remove" data-id="${item.id}">Remove</button></p>
                </div>
            `;
            cartContainer.appendChild(productDiv);
        });

        cartTotal.innerText = `₹${total}`;
        cartCount.innerText = cartItems.length;

        
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

            window.location.reload();
        });

    } catch (error) {
        console.error("Error fetching cart:", error);
    }
});


//? Place order functionality
const API_CART = "http://localhost:3000/cart";
const API_ORDERS = "http://localhost:3000/orders";

const paymentModal = document.getElementById("paymentModal");
const payNowBtn = document.getElementById("payNowBtn");
const closePaymentBtn = document.getElementById("closePaymentBtn");
const paymentMethodButtons = document.querySelectorAll(".payment-methods .method");

let selectedPaymentMethod = null;

// Payment method selection
paymentMethodButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Remove selection from all buttons
        paymentMethodButtons.forEach(btn => btn.classList.remove("selected"));
        
        // Add selection to clicked button
        button.classList.add("selected");
        selectedPaymentMethod = button.textContent;
    });
});

// Open payment modal
document.getElementById("placeOrderBtn").addEventListener("click", async () => {
    // Check if cart has items
    const cartRes = await fetch(API_CART);
    const items = await cartRes.json();

    if (items.length === 0) {
        alert("Cart is empty!");
        return;
    }

    // Reset payment method selection
    selectedPaymentMethod = null;
    paymentMethodButtons.forEach(btn => btn.classList.remove("selected"));

    // Show payment modal
    paymentModal.classList.remove("hidden");
});

// Close payment modal
closePaymentBtn.addEventListener("click", () => {
    paymentModal.classList.add("hidden");
});

// Close modal when clicking outside
paymentModal.addEventListener("click", (e) => {
    if (e.target === paymentModal) {
        paymentModal.classList.add("hidden");
    }
});

// Pay Now button - actual order creation
payNowBtn.addEventListener("click", async () => {
    // Check if payment method is selected
    if (!selectedPaymentMethod) {
        alert("Please select a payment method!");
        return;
    }

    try {
        // 1. Fetch cart items
        const cartRes = await fetch(API_CART);
        const items = await cartRes.json();

        if (items.length === 0) {
            alert("Cart is empty!");
            paymentModal.classList.add("hidden");
            return;
        }

        // 2. Calculate total amount correctly
        const totalAmount = items.reduce((sum, item) => {
            const priceNumber = Number(item.price.replace(/[₹,]/g, ""));
            return sum + (priceNumber * item.quantity);
        }, 0);

        // 3. Create order object
        const newOrder = {
            items: items,
            date: new Date().toISOString(),
            totalAmount: totalAmount,
            paymentMethod: selectedPaymentMethod,
            status: "Confirmed"
        };

        // 4. Store order in JSON (POST)
        const orderResponse = await fetch(API_ORDERS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newOrder)
        });

        if (!orderResponse.ok) {
            throw new Error("Failed to create order");
        }

        // 5. Clear cart - delete all items
        const deletePromises = items.map(item => 
            fetch(`${API_CART}/${item.id}`, { method: "DELETE" })
        );
        
        await Promise.all(deletePromises);

        // 6. Hide modal and show success
        paymentModal.classList.add("hidden");

        alert(`🎉 Payment Successful via ${selectedPaymentMethod}! Order Placed.`);

        // 7. Redirect to success page or reload
        window.location.href = "orderSuccess.html"; // or use window.location.reload();

    } catch (error) {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again.");
    }
});