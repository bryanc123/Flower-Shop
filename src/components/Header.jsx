import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

const Header = () => {

    const openMobileMenu = () => {
        document.querySelector(".mobile-menu").style.width = "100%";
    };

    const cartUpdated = useSelector((state) => state.cart.updated);

    return (
        <header>
            <div className="header-container">
                <h1><Link to="/">Flower Shop</Link></h1>
                <nav className="navigation-menu">
                    <ul>
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/settings">Settings</Link></li>
                        <li>
                            <Link to="/cart">Cart</Link>
                            { cartUpdated && <span className="cart-alert-badge">!</span> }
                        </li>
                    </ul>
                </nav>
                <div className="hamburger-menu-icon" onClick={openMobileMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    { cartUpdated && <span className="cart-alert-badge--mobile">!</span> }
                </div>
            </div>
        </header>
    );
};

export default Header;