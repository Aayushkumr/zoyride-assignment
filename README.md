# ShopSphere

A concise React e-commerce app showcasing product listings, filtering, shopping cart, and user profile features.

## Highlights

- **Home**: Showcases featured products and promotional banners.  
- **Collection**: Lists products, supports filtering (category, sub-category) and sorting (price, relevance).  
- **Product**: Displays detailed product info, images, size selection, and quantity controls.  
- **Cart**: Allows adding/removing items, updating quantities, and checking out.  
- **Profile**: Shows user details and order history (if implemented).  

## Project Structure
frontend/ ├─ src/ │ ├─ assets/ # Images, icons │ ├─ components/ # Reusable UI parts (Navbar, Footer, Filters, etc.) │ ├─ context/ # React context providers (ShopContext) │ ├─ pages/ # Screens (Home, Collection, Product, Cart, etc.) │ ├─ stores/ # Store management (cartStore) │ ├─ utils/ # Utility functions for filtering/sorting │ ├─ App.jsx # Main routes │ └─ main.jsx # Entry point ├─ public/ ├─ package.json └─ README.md


## Getting Started

1. **Install**  
   npm install  
   or yarn install  

2. **Run (Development)**  
   npm run dev  
   or yarn dev  

3. **Build**  
   npm run build  
   or yarn build  

## Usage

- Navigate via Navbar.  
- Filter and sort products on the Collection page.  
- Add items to the cart, view Cart, and proceed to checkout.  
- Access user profile to see past orders.

## Contributions

- Fork and create a branch.  
- Implement features or fixes.  
- Submit a pull request.  

## License

MIT License. Use and distribute freely.