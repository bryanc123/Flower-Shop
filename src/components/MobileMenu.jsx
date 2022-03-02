import { Link } from 'react-router-dom';

const MobileMenu = () => {

    const closeMobileMenu = () => {
        document.querySelector(".mobile-menu").style.width = 0;
    }

    return (
        <div className="mobile-menu">
            <nav>
                <span className="mobile-menu-close" onClick={closeMobileMenu}>Close</span>
                <ul>
                    <li><Link to="/" onClick={closeMobileMenu}>Products</Link></li>
                    <li><Link to="/about" onClick={closeMobileMenu}>About</Link></li>
                    <li><Link to="/cart" onClick={closeMobileMenu}>Cart</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default MobileMenu;