import { useState } from 'react';

import Header from './Header';
import Footer from './Footer';
import ProductList from './ProductList';
import Product from './Product';
import About from './About';
import Cart from './Cart';
import MobileMenu from './MobileMenu';
import { Routes, Route } from 'react-router-dom';
import { data } from "../data.js";

const Layout = () => {
    const [cart, setCart] = useState([]);
    const [cartUpdated, setCartUpdated] = useState(false);

    return (
        <>
            <MobileMenu />
            <Header cartUpdated={cartUpdated} />
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:name" element={<Product cart={cart} setCart={setCart} setCartUpdated={setCartUpdated} />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart cart={cart} setCart={setCart} cartUpdated={cartUpdated} setCartUpdated={setCartUpdated} />} />
            </Routes>
            <Footer />
        </>
    );
};

export default Layout;