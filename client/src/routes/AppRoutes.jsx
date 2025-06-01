import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MenuPage from '../pages/MenuPage';
import OrderPage from '../pages/OrderPage';
import CheckoutPage from '../pages/CheckoutPage';
import LoginPage from '../pages/LoginPage';
import CartPage from '../pages/CartPage';
import UserPage from '../pages/UserPage';
import RegisterPage from '../pages/RegisterPage';
import AboutPage from '../pages/AboutPage';
import ContactsPage from '../pages/ContactsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/order/:id" element={<OrderPage />} />
      <Route path="/order/:id/new" element={<OrderPage />} />
      <Route path="/user/:id" element={<UserPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
    </Routes>
  );
}