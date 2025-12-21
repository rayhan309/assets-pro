# 📦 Asset Management System

A high-performance web application built with **React** and **Vite** designed to streamline the tracking and management of company assets.

---

## 🎯 Project Purpose

This system was developed to solve critical inventory and HR challenges:

* **Prevent Asset Loss:** Improves accountability by ensuring every item is tagged and tracked.
* **Streamline Operations:** Simplifies the asset assignment (check-out) and return (check-in) processes.
* **Inventory Visibility:** Provides a clear, real-time view of the entire company inventory.
* **Administrative Efficiency:** Reduces manual paperwork and overhead for HR and IT departments.
* **Item Categorization:** Ensures proper tracking of **Returnable** (hardware) vs. **Non-returnable** (consumables) items.

---

## 🛠️ Technical Stack

* **Frontend:** [React](https://react.dev/)
* **Build Tool:** [Vite](https://vite.dev/) (Fast Refresh & HMR enabled)
* **Linting:** ESLint (standard configuration)

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (Latest LTS version recommended)
* **npm** or **yarn**

### Installation
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/rayhan309/assets-pro.git](https://github.com/rayhan309/assets-pro.git)
    ```
2.  **Navigate to the project folder:**
    ```bash
    cd assets-pro
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```

---

## ⚙️ Development Details

### Vite Configuration
This template provides a minimal setup to get React working in Vite with **Hot Module Replacement (HMR)**.

* **Plugin:** `@vitejs/plugin-react` (uses Babel for Fast Refresh).
* **React Compiler:** Not enabled by default to maintain build performance. [Learn more here](https://react.dev/learn/react-compiler/installation).

### Expanding the Configuration
For production-grade applications, it is recommended to:
* Use **TypeScript** for type safety.
* Enable **type-aware lint rules** in ESLint.

---

## 📈 Roadmap
- [ ] User authentication (Admin/Staff roles)