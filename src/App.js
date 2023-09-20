import './App.css';
import Navbar from './component/Navbar';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Products from './component/products';
import Product from './component/Product';
import Cart from './component/Cart';
import Checkout from './component/Checkout';
import Login from './component/Login';
import { database } from './firebase.config';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(database.currentUser);

  useEffect(() => {
    database.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:id" element={<Product />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
