import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { data, ratings as ratingsData } from '../data';

const Product = ({ cart, setCart, setCartUpdated }) => {
    let [quantity, setQuantity] = useState(1);
    let [productAdded, setProductAdded] = useState(false);

    let { name } = useParams();
    let product = data.find(item => item.name === name);
    let photographer = product.photographer ? `Photo by ${product.photographer}` : '';

    let ratingData = ratingsData.find(rating => rating.name === product.name);
    let numberOfRatings = ratingData.ratings.length;
    let rating = ratingData.ratings.reduce((previous, current) => { return previous + current }) / numberOfRatings;
    rating = Math.round(rating * 10) / 10;

    const [error, setError] = useState("");

    const onDecrement = (event) => {
        setQuantity(previousQuantity => {
            if(previousQuantity > 1) {
                return previousQuantity - 1;
            }

            return 1;
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

    const validateQuantity = () => {
        let inputQuantity = parseInt(quantity);
        if(!Number.isInteger(inputQuantity)) {
            return "Quantity entered must be a whole number";
        }
        if(inputQuantity <= 0) {
            return "Quantity entered must be at least 1";
        }
        if(inputQuantity > product.quantity) {
            return "Quantity entered cannot be greater than available stock";
        }
    }

    const addToCart = () => {
        setProductAdded(false);
        setError("");

        let inputError = validateQuantity();
        if(inputError) {
            setError(inputError);
            return;
        }

        if(cart.filter(cartItem => cartItem.name === product.description).length > 0) {
            setCartUpdated(true);
            setCart(previousCart => {
                setProductAdded(true);
                let updatedCart = cart.map(cartItem => {
                    let updatedQuantity = cartItem.quantity + parseInt(quantity);
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
            setCartUpdated(true);
            setCart(previousCart => {
                setProductAdded(true);
                return [
                    ...previousCart,
                    { name: product.description, quantity, price: product.price * quantity, image: product.image }
                ];
            });
        }
    };

    return (
        <section className="product">
            <div className="product-container">
                <div className="product__images-container">
                    <img src={`images/${name}.jpg`} alt="Tulips" className="product__image" />
                    <p>{photographer}</p>
                </div>
                <div className="product__description-container">
                    <h2>{product.description}</h2>
                    <p>Price: ${product.price}</p>
                    <p>Rating: {rating} / 5 ({numberOfRatings} ratings)</p>
                    <p>In Stock: {product.quantity}</p>
                    <span>Quantity:</span>
                    <button className="product__decrement" onClick={onDecrement}>-</button>
                    <input type="text" value={quantity} onChange={onChange} className="product__quantity"></input>
                    <button className="product__increment" onClick={onIncrement}>+</button>
                    <button className="product__add" onClick={addToCart}>Add to Cart</button>
                    {error && <div className="product__error-message">{error}</div>}
                    {productAdded && <div className="product__added-message">Product added to cart</div>}
                </div>
            </div>
        </section>
    );
}

export default Product;
