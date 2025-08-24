# E-commerce Platform (Frontend Task)

This project is a multilingual, performance-driven e-commerce frontend application built with Next.js 14, TypeScript, and TailwindCSS. It fetches product data from the `Fake Store API` to deliver a modern e-commerce experience.

---

## 📋 Task Description

The project was developed to meet the following requirements of the given task:

-   **Data Source:** Product data is fetched and filtered using the `Fake Store API`.
-   **Multilingual Support:** Provides a seamless experience in both Turkish (TR) and English (EN) using `next-intl`.
-   **Performance & SEO:** Achieves high Lighthouse scores through performance optimizations like lazy loading with `next/image` and server-side rendering (SSR) via the `Next.js App Router`.
-   **State Management:** The shopping cart state is managed globally with `Redux Toolkit (RTK)`.
-   **UI/UX:** A fully responsive and modern user interface designed with `TailwindCSS`.

---

## 🚀 Project Features

### Core Features
-   **Product Listing:** Displays all products in a grid layout.
-   **Filtering & Sorting:** Filters products by category and price range, and sorts them by price (ascending/descending).
-   **Product Detail:** A detailed page for each product showing image, price, description, and category.
-   **Cart Management:** Users can add products to the cart, adjust quantities, and remove items.
-   **Multilingual Interface:** The UI can be switched between Turkish and English.

### Advanced Features
-   **User Authentication:** A basic login system is implemented with `NextAuth.js` and `Auth0` integration.
-   **Cart Protection:** Unauthorized users are redirected to the login page when attempting to "Add to Cart", ensuring that cart operations are secure.
-   **Clean Code & Component-Based Architecture:** The project features a clean and readable codebase with modular and reusable components (`ProductsCard`, `FiltersBar`, `Header`, etc.).

---

## 🛠️ Technologies

-   [**Next.js 14+**](https://nextjs.org/) - App Router
-   [**TypeScript**](https://www.typescriptlang.org/)
-   [**TailwindCSS**](https://tailwindcss.com/)
-   [**next-intl**](https://next-intl-docs.vercel.app/) - Multilingual support
-   [**Redux Toolkit**](https://redux-toolkit.js.org/) - State management
-   [**next-auth**](https://next-auth.js.org/) - Authentication
-   [**Auth0**](https://auth0.com/) - OAuth provider
-   [**SWR**](https://swr.vercel.app/) - Data fetching and caching
-   [**react-hot-toast**](https://react-hot-toast.com/) - Notifications

---

## ⚙️ Setup and Installation

Follow these steps to get the project running on your local machine.

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/YourUsername/YourProjectName.git](https://github.com/YourUsername/YourProjectName.git)
    cd YourProjectName
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file and add the required information for Auth0, Google, GitHub, etc.

    ```env
   
    NEXT_PUBLIC_API_BASE_URL
    NEXT_PUBLIC_SITE_URL
    NEXTAUTH_URL
    NEXTAUTH_SECRET
    AUTH0_CLIENT_ID
    AUTH0_CLIENT_SECRET
    AUTH0_ISSUER
    
    ```

4.  **Run the Application:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`, `http://localhost:3000/tr`, `http://localhost:3000/en`.

---

## 🌐 Live Demo

You can find a live demo of the project here:
[https://kayraexport-case.vercel.app/tr](https://kayraexport-case.vercel.app/tr)

---
