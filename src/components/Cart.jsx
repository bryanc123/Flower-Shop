import { useState, useEffect } from 'react';

const Cart = ({ cart, setCart, cartUpdated, setCartUpdated }) => {
    let [total, setTotal] = useState(() => {
        return cart.reduce((totalPrice, cartItem) => totalPrice + cartItem.price, 0).toFixed(2);
    });

    const removeFromCart = (itemToRemove) => {
        setCart(() => {
            return cart.filter(cartItem => cartItem.name !== itemToRemove);
        });
    };

    const clearCart = () => {
        setCart([]);
    }

    useEffect(() => {
        setTotal(cart.reduce((totalPrice, cartItem) => totalPrice + cartItem.price, 0).toFixed(2));
    }, [cart]);

    useEffect(() => {
        if(cartUpdated) {
            setCartUpdated(false);
        }
    }, []);

    let cartItems;
    if(cart.length === 0) {
        cartItems = <p>No items yet</p>;
    }
    else {
        cartItems = cart.map(cartItem => (
            <div className="cart__item" key={cartItem.name}>
                <div className="cart__item-image-container">
                    <img src={cartItem.image} alt="cartItem.name" className="cart__item-image" />
                </div>
                <span className="cart__item-description">{cartItem.name} X {cartItem.quantity} </span>
                <button className="cart__item-remove" onClick={() => { removeFromCart(cartItem.name); }}>Remove</button>
                <span className="cart__item-price">${cartItem.price.toFixed(2)}</span>
            </div>
        ));
    }

    return (
        <section className="cart">
            <div className="cart-container">
                <h2>Items in Your Cart</h2>
                {cartItems}
                <div className="cart__total">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
                <button className="cart__clear" onClick={clearCart}>Clear Cart</button>
            </div>
        </section>
    );
};

export default Cart;