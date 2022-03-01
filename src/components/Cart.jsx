const Cart = ({ cart }) => {

    let cartItems;
    
    if(cart.length === 0) {
        cartItems = <p>No items yet</p>;
    }
    else {
        cartItems = cart.map(cartItem => (
            <div className="cart__item">
                <span>{cartItem.name} X {cartItem.quantity} </span>
                <span>${cartItem.price}</span>
            </div>
        ));
    }

    let total = cart.reduce((aggregate, cartItem) => aggregate + cartItem.price, 0);

    return (
        <section className="cart">
            <div className="cart-container">
                <h2>Cart</h2>
                {cartItems}
                <div className="cart__total">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
            </div>
        </section>
    );
};

export default Cart;