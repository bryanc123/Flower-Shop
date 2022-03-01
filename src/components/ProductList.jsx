import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
    let productContainers = products.map((product) => (
        <div className="product" key={product.name}>
            <Link to={`/product/${product.name}`}>
                <img src={product.image} alt={product.description} className="product-thumbnail__image" />
            </Link>
            <Link to={`/product/${product.name}`}>
                <h3>{product.description}</h3>
            </Link>
            <p>Price: ${product.price}</p>
            <p>In Stock: {product.quantity}</p>
        </div>
    ));

    let pStyles = {
        display: "grid",
        gridGap: "60px 20px",
        gridTemplateColumns: "repeat(3, 1fr)",
        padding: "20px"
    };

    return (
        <>
        <p className="product-list__intro">Choose from our fine selection of flowers</p>
        <section className="products" style={pStyles}>
        {productContainers}
        </section>
        </>
    );
};

export default ProductList;