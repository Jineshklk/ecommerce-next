# 🛍️ E-Commerce Next.js Project

[Live Demo](https://ecommerce-next-9shc.onrender.com/)

A modern e-commerce web application built with **Next.js**, **React**, and **Tailwind CSS**. Users can browse products, add them to the cart, and proceed to checkout. Includes an admin dashboard for product management and real-time statistics.

---

## 🚀 Features

### Frontend
- Responsive and modern UI with **Tailwind CSS**
- Product listing with images and prices
- Add to cart with quantity updates
- Cart summary with total price
- Checkout page with order summary and mock payment placeholder
- Recommendations page showing selected products
- Navigation to Home, Cart, Recommendations, Admin, and Dashboard

### Admin
- View all products in a clean dashboard
- Real-time statistics (e.g., total products, low stock)
- Add new products (name, slug, price, image, inventory)

### Context & State
- **CartContext** using React Context API for global cart state
- Real-time cart updates reflected in Navbar
- Persistent state across pages

### Next.js Features
- API routes for managing products
- SSR & static generation for better performance
- Routing for products, cart, checkout, recommendations, admin, and dashboard

---

## 🛠 Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js API routes (Next.js)
- **State Management:** React Context API
- **Deployment:** [Render](https://render.com/)

---

## 📂 Project Structure

.
├─ pages/
│ ├─ index.tsx # Home / Products page
│ ├─ cart.tsx # Shopping cart page
│ ├─ checkout.tsx # Checkout page
│ ├─ recommendations.tsx# Recommended products
│ ├─ admin.tsx # Admin panel
│ └─ dashboard.tsx # Admin statistics
├─ components/
│ ├─ Navbar.tsx
│ └─ Footer.tsx
├─ context/
│ └─ CartContext.tsx # Cart state management
├─ lib/
│ ├─ products.ts # Product data
│ └─ types.ts # Type definitions
├─ public/images/ # Product images
├─ styles/
│ └─ globals.css # Tailwind CSS
├─ tailwind.config.js
└─ next.config.js

yaml
Copy code

---

## ⚡ Getting Started (Local)

1. **Clone the repository:**

```bash
git clone https://github.com/Jineshklk/ecommerce-next.git
cd ecommerce-next
Install dependencies:

bash
Copy code
npm install
Run the development server:

bash
Copy code
npm run dev
Open the app:

Visit http://localhost:3000

✅ Production Build
bash
Copy code
npm run build
npm start
This simulates the production environment as on Render.

🔧 Deployment
This project is deployed on Render:

Live URL: https://ecommerce-next-9shc.onrender.com/

Render Web Service handles the Next.js server.

Make sure to set environment variables if required for future features.

📌 Notes
Currently, checkout is a placeholder and does not process payments.

Ensure images are placed in public/images/ and referenced as /images/filename.jpg.

Tailwind CSS is configured to purge unused styles in production. Dynamic class names should be either static or safelisted in tailwind.config.js.

✨ Future Improvements
Implement real payment gateway integration

User authentication and account management

Order history and tracking

Dynamic recommendations using AI

Inventory management with alerts for low stock

📄 License
This project is MIT Licensed.

Made with ❤️ by Jinesh Kini

yaml
Copy code
