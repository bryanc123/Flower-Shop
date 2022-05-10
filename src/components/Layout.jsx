import Header from './Header';
import Footer from './Footer';
import ProductList from './ProductList';
import Product from './Product';
import About from './About';
import Cart from './Cart';
import MobileMenu from './MobileMenu';
import { Routes, Route } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <MobileMenu />
            <Header />
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:name" element={<Product />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
        </>
    );
};

export default Layout;