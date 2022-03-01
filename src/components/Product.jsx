import { useState } from 'react';
import { useParams } from 'react-router-dom';

import data from '../data';

const Product = ({ cart, setCart }) => {
    let [quantity, setQuantity] = useState(0);
    let [displayAdded, setDisplayAdded] = useState(false);

    let { name } = useParams();
    let product = data.find(item => item.name === name);
    let photographer = product.photographer ? `Photo by ${product.photographer}` : '';

    const onDecrement = (event) => {
        setQuantity(previousQuantity => {
            if(previousQuantity > 0) {
                return previousQuantity - 1;
            }

            return 0;
        })
    }

    const onIncrement = (event) => {
        setQuantity(previousQuantity => {
            if(previousQuantity < product.quantity) {
                return previousQuantity + 1;
            }

            return previousQuantity;
        })
    }

    const onChange = (event) => {
        setQuantity(event.target.value);
    };

    const addToCart = () => {
        // check if item is already in cart
        if(cart.filter(cartItem => cartItem.name === product.description).length > 0) {
            setCart(previousCart => {
                setDisplayAdded(true);
                let amountToAdd = quantity;
                let updatedCart = cart.map(cartItem => {
                    let updatedQuantity = cartItem.quantity + quantity;
                    return cartItem.name === product.description ?
                    Object.assign(
                        {},
                        cartItem,
                        {
                            quantity: updatedQuantity,
                            price: product.price * updatedQuantity
                        })
                    : cartItem;
                });
                return updatedCart;
            });
        }
        else {
            setCart(previousCart => {
                setDisplayAdded(true);
                return [
                    ...previousCart,
                    { name: product.description, quantity, price: product.price * quantity, image: product.image }
                ];
            });
        }
    };

    return (
        <>
            <section className="product-container">
                <div className="product__images-container">
                    <img src={`images/${name}.jpg`} alt="Tulips" className="product__image" />
                    <p>{photographer}</p>
                </div>
                <div className="product__description-container">
                    <h2>{product.description}</h2>
                    <p>Price: ${product.price}</p>
                    <p>In Stock: {product.quantity}</p>
                    <span>Quantity:</span>
                    <button className="product__decrement" onClick={onDecrement}>-</button>
                    <input type="text" value={quantity} onChange={onChange} className="product__quantity"></input>
                    <button className="product__increment" onClick={onIncrement}>+</button>
                    <button className="product__add" onClick={addToCart}>Add to Cart</button>
                    {displayAdded && <p>Product added to cart</p>}
                </div>
            </section>
        </>
    );
}

export default Product;
