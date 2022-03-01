import { useState } from 'react';
import { useParams } from 'react-router-dom';

import data from '../data';

const Product = ({ setCart }) => {
    let [quantity, setQuantity] = useState(0);

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
        setCart(previousCart => {
            return [...previousCart, { name: product.description, quantity, price: product.price * quantity }];
        })
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
                </div>
            </section>
        </>
    );
}

export default Product;
