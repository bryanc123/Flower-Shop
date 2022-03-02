import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ratings as ratingsData } from '../data';

const ProductList = ({ products, setProducts }) => {

    const ratings = products.map(product => {
        let _ratings = ratingsData.find(ratedProduct => ratedProduct.name === product.name).ratings;

        let rating = _ratings.reduce((previous, current) => { return previous + current }) / _ratings.length;

        return {
            name: product.name,
            rating: Math.round(rating * 10) / 10,
            numberOfRatings: _ratings.length
        };
    });

    const sortProductsByName = () => {
        setProducts(previousProducts => {
            return [...previousProducts].sort((a, b) => {
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
            });
        });
    };

    const sortProductsByPrice = () => {
        setProducts(previousProducts => {
            return [...previousProducts].sort((a, b) => {
                if(a.price < b.price) { return -1; }
                if(a.price > b.price) { return 1; }
                return 0;
            });
        });
    };

    const sortProductsByRating = () => {
        setProducts(previousProducts => {
            return [...previousProducts].sort((a, b) => {
                let ratingA = ratings.find(score => score.name === a.name).rating;
                let ratingB = ratings.find(score => score.name === b.name).rating;
                if(ratingA < ratingB) { return 1; }
                if(ratingA > ratingB) { return -1; }
                return 0;
            });
        });
    };

    let productContainers = products.map((product) => {
        let productRating = ratings.find(score => score.name === product.name);

        return (
            <div className="product-card" key={product.name}>
                <Link to={`/product/${product.name}`}>
                    <img src={product.image} alt={product.description} className="product-card__image" />
                </Link>
                <Link to={`/product/${product.name}`}>
                    <h3>{product.description}</h3>
                </Link>
                <p>Price: ${product.price}</p>
                <p>In Stock: {product.quantity}</p>
                <p>Rating: {productRating.rating} / 5 ({productRating.numberOfRatings} ratings)</p>
            </div>
        );
    });

    return (
        <section className="products">
            <div className="products__container">
                <p className="products__intro">Choose from our fine selection of flowers</p>
                <div className="products__sort">
                    <span>Sort by: </span>
                    <button onClick={sortProductsByName} className="products__sort-by-name">Name</button>
                    <button onClick={sortProductsByPrice} className="products__sort-by-name">Price</button>
                    <button onClick={sortProductsByRating} className="products__sort-by-rating">Rating</button>
                </div>
                <div className="products__gallery">
                {productContainers}
                </div>
            </div>
        </section>
    );
};

export default ProductList;