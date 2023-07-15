import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { FaCartPlus } from 'react-icons/fa';

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
                        <li><Link to="/login">Log In</Link></li>
                        <li>
                            <Link to="/cart"><FaCartPlus style={{fontSize: "24px", marginTop:"2px"}} /></Link>
                            { cartUpdated && <span className="cart-alert-badge">!</span> }
                        </li>
                    </ul>
                </nav>
                <div className="mobile-header-menu">
                    <div className="mobile-header-cart">
                        <Link to="/cart"><FaCartPlus style={{fontSize: "24px"}} /></Link>
                        { cartUpdated && <span className="cart-alert-badge--mobile">!</span> }
                    </div>
                    <div className="hamburger-menu-icon" onClick={openMobileMenu}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;