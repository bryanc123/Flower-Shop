import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
    let productContainers = products.map((product) => (
        <div className="product-card" key={product.name}>
            <Link to={`/product/${product.name}`}>
                <img src={product.image} alt={product.description} className="product-card__image" />
            </Link>
            <Link to={`/product/${product.name}`}>
                <h3>{product.description}</h3>
            </Link>
            <p>Price: ${product.price}</p>
            <p>In Stock: {product.quantity}</p>
        </div>
    ));

    return (
        <section className="products">
            <div className="products__container">
                <p className="products__intro">Choose from our fine selection of flowers</p>
                <div className="products__gallery">
                {productContainers}
                </div>
            </div>
        </section>
    );
};

export default ProductList;