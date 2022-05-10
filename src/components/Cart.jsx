import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { removeFromCart, clearCart, setCartUpdated } from '../features/cart/cartSlice';

const Cart = () => {
    const cart = useSelector((state) => state.cart.items);
    const cartUpdated = useSelector((state) => state.cart.updated);
    const dispatch = useDispatch();

    const [total, setTotal] = useState(() => {
        return cart.reduce((totalPrice, cartItem) => totalPrice + cartItem.price, 0).toFixed(2);
    });

    useEffect(() => {
        setTotal(cart.reduce((totalPrice, cartItem) => totalPrice + cartItem.price, 0).toFixed(2));
    }, [cart]);

    useEffect(() => {
        if(cartUpdated) {
            dispatch(setCartUpdated(false));
        }
    }, []);

    let cartItems;
    if(cart.length === 0) {
        cartItems = <p>No items</p>;
    }
    else {
        cartItems = cart.map(cartItem => (
            <div className="cart__item" key={cartItem.name}>
                <div className="cart__item-image-container">
                    <img src={cartItem.image} alt={cartItem.name} className="cart__item-image" />
                </div>
                <span className="cart__item-description">{cartItem.description} X {cartItem.quantity} </span>
                <button className="cart__item-remove" onClick={() => dispatch(removeFromCart(cartItem.name))}>Remove</button>
                <span className="cart__item-price">${cartItem.price.toFixed(2)}</span>
            </div>
        ));
    }

    return (
        <section className="cart">
            <div className="cart__container">
                <h2>Items in Your Cart</h2>
                {cartItems}
                <div className="cart__total">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
                <button className="cart__clear" onClick={() => dispatch(clearCart())}>Clear Cart</button>
            </div>
        </section>
    );
};

export default Cart;