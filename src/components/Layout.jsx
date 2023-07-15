import Header from './Header';
import Subheader from './Subheader';
import Footer from './Footer';
import ProductList from './ProductList';
import Product from './Product';
import About from './About';
import Login from './Login';
import Settings from './Settings';
import Cart from './Cart';
import MobileMenu from './MobileMenu';
import { Routes, Route } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <MobileMenu />
            <Header />
            <Subheader />
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:name" element={<Product />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
        </>
    );
};

export default Layout;