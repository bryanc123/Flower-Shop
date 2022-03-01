import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <h1><Link to="/">Flower Shop</Link></h1>
            <nav>
                <ul>
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                </ul>
            </nav>
        </header>
    );
}