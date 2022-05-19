import { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { data, ratings as ratingsData } from '../data';
import { useEffect } from 'react';

import debounce from 'lodash.debounce';

const ProductList = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const [products, setProducts] = useState(data);
    const [sortBy, setSortBy] = useState({ label: "A-Z", value: "name" });

    const ratings = products.map(product => {
        let _ratings = ratingsData.find(ratedProduct => ratedProduct.name === product.name).ratings;

        let rating = _ratings.reduce((previous, current) => { return previous + current }) / _ratings.length;

        return {
            name: product.name,
            rating: Math.round(rating * 10) / 10,
            numberOfRatings: _ratings.length
        };
    });

    const onChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const debouncedSearch = debounce(() => {
        setProducts(() => {
            return data.filter(product => {
                return product.name.includes(searchTerm.trim().toLowerCase());
            });
        });
    }, 500);

    useEffect(() => {
        debouncedSearch();
    }, [searchTerm]);

    const sortProductsByName = (orderControl) => {
        setProducts(previousProducts => {
            return [...previousProducts].sort((a, b) => {
                if(a.name < b.name) { return orderControl * -1; }
                if(a.name > b.name) { return orderControl * 1; }
                return 0;
            });
        });
    };

    const sortProductsByPrice = (orderControl) => {
        setProducts(previousProducts => {
            return [...previousProducts].sort((a, b) => {
                if(a.price < b.price) { return orderControl * -1; }
                if(a.price > b.price) { return orderControl * 1; }
                return 0;
            });
        });
    };

    const sortProductsByRating = (orderControl) => {
        setProducts(previousProducts => {
            return [...previousProducts].sort((a, b) => {
                let ratingA = ratings.find(score => score.name === a.name).rating;
                let ratingB = ratings.find(score => score.name === b.name).rating;
                if(ratingA < ratingB) { return orderControl * -1; }
                if(ratingA > ratingB) { return orderControl * 1; }
                return 0;
            });
        });
    };

    const sortOptions = [
        {
            label: "A-Z",
            value: "name"
        },
        {
            label: "Z-A",
            value: "nameDescending"
        },
        {
            label: "Highest Price",
            value: "priceDescending"
        },
        {
            label: "Lowest Price",
            value: "price"
        },
        {
            label: "Highest Rated",
            value: "ratingDescending"
        },
        {
            label: "Lowest Rated",
            value: "rating"
        },
    ];

    let productContainers = products.map((product) => {
        let productRating = ratings.find(score => score.name === product.name);

        return (
            <div className="product__card" key={product.name}>
                <div className="product__card-image-container">
                    <Link to={`/product/${product.name}`}>
                        <img src={product.image} alt={product.description} className="product__card--image" />
                    </Link>
                </div>
                <div className="product__card-details-container">
                    <Link to={`/product/${product.name}`}>
                        <h3>{product.description}</h3>
                    </Link>
                    <p>Price: ${product.price}</p>
                    <p>In Stock: {product.quantity}</p>
                    <p>Rating: {productRating.rating} / 5 ({productRating.numberOfRatings} ratings)</p>
                </div>
            </div>
        );
    });

    useEffect(() => {
        switch(sortBy.value) {
            case "name":
                sortProductsByName(1);
                break;
            case "nameDescending":
                sortProductsByName(-1);
                break;
            case "price":
                sortProductsByPrice(1);
                break;
            case "priceDescending":
                sortProductsByPrice(-1);
                break;
            case "rating":
                sortProductsByRating(1);
                break;
            case "ratingDescending":
                sortProductsByRating(-1);
                break;
            default:
                break;
        }
    }, [products, sortBy]);

    const selectStyles = {
        container: (styles) => ({
            ...styles,
            width: 180,
            "@media only screen and (min-width: 500px)": {
                ...styles["@media only screen and (min-width: 500px"],
                width: 230
            },
            "@media only screen and (min-width: 800px)": {
                ...styles["@media only screen and (min-width: 800px"],
                width: 300
            }
        })
    };

    return (
        <section className="products">
            <div className="products__container">
                <h2 class="products__intro">All Homegrown Flowers</h2>
                <div className="products__search-and-sort-container">
                    <div className="products__search-container">
                        <span>Search:</span>
                        <input
                            type="text"
                            name="products-search"
                            className="products__search"
                            value={searchTerm}
                            onChange={onChange}
                        />
                    </div>
                    <div className="products__sort">
                        <span>Sort:</span>
                        <div style={{display:"inline-block", marginLeft: "10px"}}>
                            <Select
                                defaultValue={sortBy}
                                isSearchable={false}
                                onChange={setSortBy}
                                options={sortOptions}
                                styles={selectStyles}
                            />
                        </div>
                    </div>
                </div>
                <div className="products__gallery">
                    {productContainers}
                </div>
                {!products.length && <p>Sorry, no products that match your query were found!</p>}
            </div>
        </section>
    );
};

export default ProductList;