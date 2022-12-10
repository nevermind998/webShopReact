import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/cart/CartProvider";
// this is example provider
import { CounterProvider } from "./context/counter/CounterProvider";
import { HomePage, ExamplePage, NotFoundPage, CartPage } from "pages";
import { ProductsProvider } from "context/product/ProductProvider";
import { FilterProductsProvider } from "context/filter/FilterProvider";
import ProductPage from "pages/product/ProductPage";

function App() {
  return (
    <CounterProvider>
      <CartProvider>
        <ProductsProvider>
          <FilterProductsProvider>
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/example" element={<ExamplePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/ProductPage/:id" element={<ProductPage />} />
        </Routes>
          </FilterProductsProvider>
        </ProductsProvider>
      </CartProvider>
    </CounterProvider>


     
    
  );

}

export default App;
