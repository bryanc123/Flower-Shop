import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

const MobileMenu = () => {

    const cartUpdated = useSelector((state) => state.cart.updated);

    const closeMobileMenu = () => {
        document.querySelector(".mobile-menu").style.width = 0;
    }

    return (
        <div className="mobile-menu">
            <nav>
                <span className="mobile-menu-close" onClick={closeMobileMenu}>Close</span>
                <ul>
                    <li><Link to="/" onClick={closeMobileMenu}>Products</Link></li>
                    <li><Link to="/settings" onClick={closeMobileMenu}>Settings</Link></li>
                    <li><Link to="/about" onClick={closeMobileMenu}>About</Link></li>
                    <li>
                        <Link to="/cart" style={{position: "relative"}} onClick={closeMobileMenu}>
                            Cart
                            { cartUpdated && <span className="cart-alert-badge--mobile-menu">!</span> }
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default MobileMenu;