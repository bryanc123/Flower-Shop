import { useState } from 'react';

import Header from './Header';
import Footer from './Footer';
import ProductList from './ProductList';
import Product from './Product';
import About from './About';
import Cart from './Cart';
import { Routes, Route } from 'react-router-dom';
import data from "../data.js";

const Layout = ({ children }) => {
    const [products, setProducts] = useState(data);
    const [cart, setCart] = useState([]);

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<ProductList products={products} />} />
                <Route path="/product/:name" element={<Product cart={cart} setCart={setCart} />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
            </Routes>
            <Footer />
        </>
    );
};

export default Layout;