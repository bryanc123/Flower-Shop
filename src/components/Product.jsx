import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addToCart, updateProductQuantity, setCartUpdated } from '../features/cart/cartSlice';

import { data, ratings as ratingsData } from '../data';

const Product = () => {
    let [quantity, setQuantity] = useState(1);
    let [productAdded, setProductAdded] = useState(false);
    const [error, setError] = useState("");

    const cart = useSelector((state) => state.cart.items);
    const showRecommended = useSelector((state) => state.settings.showRecommended);
    const dispatch = useDispatch();

    let { name } = useParams();
    let product = data.find(item => item.name === name);
    let photographer = product.photographer ? `Photo by ${product.photographer}` : '';

    let ratingData = ratingsData.find(rating => rating.name === product.name);
    let numberOfRatings = ratingData.ratings.length;
    let rating = ratingData.ratings.reduce((previous, current) => { return previous + current }) / numberOfRatings;
    rating = Math.round(rating * 10) / 10;

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

    const add = () => {
        setProductAdded(false);
        setError("");

        let inputError = validateQuantity();
        if(inputError) {
            setError(inputError);
            return;
        }

        setProductAdded(true);
        let alreadyInCart = false;
        cart.forEach(item => {
            if(name === item.name) {
                alreadyInCart = true;
            }
        });
        if(alreadyInCart) {
            dispatch(updateProductQuantity({
                name,
                quantity,
                price: product.price * quantity
            }));
        } else {
            dispatch(addToCart({
                name: product.name,
                description: product.description,
                quantity: quantity,
                price: product.price * quantity,
                image: product.image
            }));
        }
        dispatch(setCartUpdated(true));
    };

    let recommendedProducts = [];
    for(let i = 0; i < data.length; i++) {
        if(data[i].name === name) {
            continue;
        }
        let ratingData = ratingsData.find(rating => rating.name === data[i].name);
        let numberOfRatings = ratingData.ratings.length;
        let rating = ratingData.ratings.reduce((previous, current) => { return previous + current }) / numberOfRatings;
        rating = Math.round(rating * 10) / 10;
        recommendedProducts.push({
            ...data[i],
            rating,
            numberOfRatings
        });
        if(recommendedProducts.length === 3) {
            break;
        }
    }
    recommendedProducts = recommendedProducts.map(product => {
        return (
            <div className="recommended-product" key={product.name}>
                <Link to={`/product/${product.name}`}>
                    <img src={`images/${product.name}.jpg`} alt={product.description} className="recommended-product__image" />
                </Link>
                <Link to={`/product/${product.name}`}>
                    <h3>{product.description}</h3>
                </Link>
                <p>Price: ${product.price}</p>
                <p>Rating: {product.rating} / 5 ({product.numberOfRatings} ratings)</p>
                <p>In Stock: {product.quantity}</p>
            </div>
        )
    });

    return (
        <section className="product">
            <div className="product__container">
                <div className="product__purchase-container">
                    <div className="product__images-container">
                        <img src={`images/${name}.jpg`} alt={product.description} className="product__image" />
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
                        <button className="product__add" onClick={add}>Add to Cart</button>
                        {error && <div className="product__error-message">{error}</div>}
                        {productAdded && <div className="product__added-message">Product added to cart</div>}
                    </div>
                </div>
                {
                    showRecommended && 
                    <div className="recommended-products">
                    <h2>Recommended Products</h2>
                    <div className="recommended-products__row">
                        {recommendedProducts}
                    </div>
                </div>
                }
            </div>
        </section>
    );
}

export default Product;
