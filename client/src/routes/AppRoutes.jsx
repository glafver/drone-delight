import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MenuPage from '../pages/MenuPage';
import OrderPage from '../pages/OrderPage';
import CheckoutPage from '../pages/CheckoutPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}