# 🛍️ LOXI – Apparel Ecommerce Website

**Loxi** is a fully responsive and dynamic **Apparel Ecommerce Website** built using **HTML, CSS, and JavaScript**, with data handled through **JSON Server** (`db.json`) as a mock backend.  
It provides all the core features of an ecommerce website — products, user registration & login, cart system, and dynamic rendering.

---

## 🌐 Live Demo (Optional)
> https://loxi-store.netlify.app/

---

## 🚀 Features

- 🏠 **Dynamic Home Page** – Displays trending and featured apparel items.  
- 👕 **Product Listing Page (PLP)** – Fetches all product data dynamically from the backend (`db.json`).  
- 📄 **Product Detail Page (PDP)** – Displays details of the selected product using URL parameters (`?id=`).  
- 🛒 **Cart System** – Add, view, and remove items from the cart dynamically using the `/cart` endpoint.  
- 🔐 **User Authentication** – Register and login using `/users` endpoint on `json-server`.  
- 💬 **Smart Notifications** – Clean UI-based messages for registration, login, and cart operations.  
- 💻 **Fully Functional Mock Backend** – Powered by `json-server`.

---

## 🧠 Tech Stack

| Category | Tools / Libraries |
|-----------|------------------|
| **Frontend** | HTML, CSS, JavaScript |
| **Styling** | CSS3 (fully responsive) |
| **Backend (Mock)** | JSON Server |
| **Data Handling** | Fetch API, async/await |
| **Version Control** | Git & GitHub |

---

## ⚙️ Setup Instructions

Follow these steps to run **Loxi** locally on your system:

### 🪄 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/loxi-store.git
cd loxi-store
```
2. Install JSON Server

If you don’t have JSON Server installed globally:
```bash
npm install -g json-server
```
3. Check Your db.json File

The file db.json contains all data for:

Products – /products

Users – /users

Cart Items – /cart

``` bash
Example structure:

{
  "products": [
    {
      "id": 1,
      "name": "White Oversized T-Shirt",
      "price": 899,
      "MainImg": "images/white-shirt.jpg",
      "sideImg1": "images/white-shirt-side1.jpg",
      "sideImg2": "images/white-shirt-side2.jpg",
      "description": "Soft cotton oversized t-shirt for casual comfort."
    }
  ],
  "users": [],
  "cart": []
}
``` 
4. Start the JSON Server

Run this command inside your project directory:
``` bash
cd DATA
json-server --watch db.json --port 3000
```

This will start a mock REST API at:

http://localhost:3000

Available Endpoints:
Endpoint	Description
/products	Get all products
/products/:id	Get a single product
/users	Get or add users
/cart	Get or modify cart items


5. Open the Website

Simply open index.html in your browser, or use Live Server in VS Code for best performance.


## 📁 Folder Structure
``` bash
APPAREL E-COMMERCE PROJECT/
├── .vscode/
│
├── Assets/
│
├── CSS/
│ ├── aboutwebpage.css
│ ├── accessories.css
│ ├── BEST_SELLER.css
│ ├── BEST_SELLERW.css
│ ├── EshopMAN.css
│ ├── EshopWOMEN.css
│ ├── LandingPage.css
│ ├── logingpage.css
│ ├── MyCart.css
│ ├── NEWARRIVALM.css
│ ├── NEWARRIVALW.css
│ ├── ProductDetails.css
│ ├── ProductDetails_Female.css
│ ├── registration.css
│ ├── TheMAN.css
│ └── TheWOMEN.css
│
├── DATA/
│ └── db.json
│
├── JS/
│ ├── accessories.js
│ ├── bestseller.js
│ ├── EshopMAN.js
│ ├── EshopWOMEN.js
│ ├── loginpage.js
│ ├── MyCart.js
│ ├── ProductDetails.js
│ ├── ProductDetailsWOMEN.js
│ ├── registration.js
│ └── TheMAN.js
│
├── aboutwebpage.html
├── accessories.html
├── BEST_SELLER.html
├── BEST_SELLERW.html
├── EshopMAN.html
├── EshopWOMEN.html
├── index.html
├── loginpage.html
├── MyCart.html
├── mylogin.html
├── NEWARRIVALM.html
├── NEWARRIVALW.html
├── ProductDetails.html
├── ProductDetails_Female.html
├── registration.html
├── TheMAN.html
├── TheWOMEN.html
└── README.md
```
