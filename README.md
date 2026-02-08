# 🛍️ LOXI — Frontend Ecommerce Application

LOXI is a fully responsive ecommerce frontend application built using HTML, CSS, and JavaScript.
It demonstrates dynamic UI rendering, cart functionality, and authentication flows using a mock REST API powered by JSON Server.

This project focuses on frontend engineering, UI structuring, and API integration — not on building a production backend.

---

## 🌐 Live Demo

[https://loxi-store.netlify.app/](https://loxi-store.netlify.app/)

⚠️ **Note:**
The deployed version demonstrates UI functionality only.
Features such as cart and authentication require the JSON Server backend running locally.

---

## 📌 Project Type

Frontend Application with Mock API Integration

* Frontend built using HTML, CSS, JavaScript
* Backend simulated using JSON Server
* Data stored locally in `db.json`
* Designed to practice frontend architecture and API consumption

This is not a production full-stack ecommerce platform.

---

## 🚀 Features

* Dynamic Home Page displaying apparel items
* Product Listing fetched from API
* Product Detail view using URL parameters
* Add/remove items from cart
* User registration & login simulation
* Responsive design across devices
* Notification-based UI feedback

---

## 🧠 Tech Stack

| Category        | Tools                  |
| --------------- | ---------------------- |
| Frontend        | HTML, CSS, JavaScript  |
| Styling         | CSS3 (Responsive)      |
| Mock Backend    | JSON Server            |
| Data Handling   | Fetch API, async/await |
| Version Control | Git & GitHub           |
| Deployment      | Netlify                |

---

## ⚙️ Run Locally

### Clone Repository

```
git clone https://github.com/<your-username>/loxi-store.git
cd loxi-store
```

### Install JSON Server

```
npm install -g json-server
```

### Start Backend

```
cd DATA
json-server --watch db.json --port 3000
```

API available at:

```
http://localhost:3000
```

### Launch Frontend

Open `index.html` using Live Server or browser.

---

## 📁 API Endpoints

| Endpoint      | Description               |
| ------------- | ------------------------- |
| /products     | Get product list          |
| /products/:id | Get product details       |
| /users        | Register/Login simulation |
| /cart         | Cart operations           |

---

## 📚 What I Learned

* Structuring multi-page frontend systems
* Fetch API and async data handling
* URL parameter based rendering
* Cart state logic implementation
* Working with REST-style endpoints
* Mock backend integration
* Deployment workflow

---

## 👨‍💻 Author

Sukhpreet Singh
