// const CART_URL = "http://localhost:3000/cart";

// document.getElementById("addToCartBtn").addEventListener("click", async () => {
//   const product = {
//     id: Date.now(), // unique id for each product (can replace with real product ID)
//     name: document.getElementById("productName").textContent,
//     price: document.getElementById("productPrice").childNodes[0].textContent.trim(),  // This grabs only the text node before the <span>.
//     image: document.getElementById("productImage").src,
//     quantity: 1
//   };

//   try {
//     // Check if product already exists in cart (based on name)
//     const res = await fetch(`${CART_URL}?name=${encodeURIComponent(product.name)}`);
//     const data = await res.json();

//     if (data.length > 0) {
//       // Product exists: update quantity
//       const existing = data[0];
//       await fetch(`${CART_URL}/${existing.id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ quantity: existing.quantity + 1 })
//       });
//     } else {
//       // Add new product
//       await fetch(CART_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(product)
//       });
//     }

//     // Feedback to user
//     const msg = document.createElement("div");
//     msg.textContent = "✅ Added to cart successfully!";
//     msg.style.cssText = `
//       position: fixed;
//       bottom: 20px;
//       left: 50%;
//       transform: translateX(-50%);
//       background: #222;
//       color: white;
//       padding: 10px 20px;
//       border-radius: 8px;
//       font-size: 16px;
//       z-index: 9999;
//     `;
//     document.body.appendChild(msg);
//     setTimeout(() => msg.remove(), 2000);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// });

// document.addEventListener("DOMContentLoaded", () => {
//     const CART_URL = "http://localhost:3000/cart";

//     document.getElementById("addToCartBtn").addEventListener("click", async () => {
//         const product = {
//             id: Date.now(),
//             name: document.getElementById("productName").textContent,
//             price: document.getElementById("productPrice").innerText.split(" ")[0].trim(),
//             image: document.getElementById("productImage").src,
//             quantity: 1
//         };

//         try {
//             const res = await fetch(`${CART_URL}?name=${encodeURIComponent(product.name)}`);
//             const data = await res.json();

//             if (data.length > 0) {
//                 const existing = data[0];
//                 await fetch(`${CART_URL}/${existing.id}`, {
//                     method: "PATCH",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ quantity: existing.quantity + 1 })
//                 });
//             } else {
//                 await fetch(CART_URL, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(product)
//                 });
//             }

//             // Feedback message
//             const msg = document.createElement("div");
//             msg.textContent = "✅ Added to cart successfully!";
//             msg.style.cssText = `
//               position: fixed;
//               bottom: 20px;
//               left: 50%;
//               transform: translateX(-50%);
//               background: #222;
//               color: white;
//               padding: 10px 20px;
//               border-radius: 8px;
//               font-size: 16px;
//               z-index: 9999;
//             `;
//             document.body.appendChild(msg);
//             setTimeout(() => msg.remove(), 5000);
//         } catch (error) {
//             console.error("Error:", error);
//             alert("❌ Something went wrong! Check console.");
//         }
//     });
// });


document.addEventListener("DOMContentLoaded", () => {
    const CART_URL = "http://localhost:3000/cart";

    document.getElementById("addToCartBtn").addEventListener("click", async () => {
        const productName = document.getElementById("productName").textContent;
        const productPrice = document.getElementById("productPrice").innerText.split(" ")[0].trim();
        const productImage = document.getElementById("productImage").src;

        try {
            // 1️⃣ Check if product already exists in cart
            const res = await fetch(`${CART_URL}?name=${encodeURIComponent(productName)}`);
            const data = await res.json();

            let messageText = "";

            if (data.length > 0) {
                // 2️⃣ Product exists, increment quantity
                const existing = data[0];
                const newQuantity = existing.quantity + 1; // increase quantity

                await fetch(`${CART_URL}/${existing.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ quantity: newQuantity })
                });

                messageText = `✅ Quantity updated to ${newQuantity}!`;
            } else {
                // 3️⃣ Product does not exist, add new
                const product = {
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                };

                await fetch(CART_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(product)
                });

                messageText = "✅ Added to cart successfully!";
            }

            // 4️⃣ Show feedback message
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
              opacity: 1;
              transition: opacity 1s ease;
            `;
            document.body.appendChild(msg);

            setTimeout(() => {
                msg.style.opacity = "1";
                setTimeout(() => msg.remove(), 1000);
            }, 7000);

        } catch (error) {
            console.error("Error:", error);
            alert("❌ Something went wrong! Check console.");
        }
    });
});
