import { Link } from 'react-router-dom';

const Header = ({ cartUpdated }) => {

    const openMobileMenu = () => {
        document.querySelector(".mobile-menu").style.width = "100%";
    };

    return (
        <header>
            <div className="header-container">
                <h1><Link to="/">Flower Shop</Link></h1>
                <nav className="navigation-menu">
                    <ul>
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li>
                            <Link to="/cart">Cart</Link>
                            { cartUpdated && <span class="badge">!</span> }
                        </li>
                    </ul>
                </nav>
                <div className="hamburger-menu-icon" onClick={openMobileMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </header>
    );
};

export default Header;