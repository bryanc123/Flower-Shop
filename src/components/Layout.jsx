import { useState } from 'react';

import Header from './Header';
import Footer from './Footer';
import ProductList from './ProductList';
import Product from './Product';
import About from './About';
import { Routes, Route } from 'react-router-dom';
import data from "../data.js";

const Layout = ({ children }) => {
    const [products, setProducts] = useState(data);

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<ProductList products={products} />} />
                <Route path="/product/:name" element={<Product />} />
                <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
        </>
    );
};

export default Layout;