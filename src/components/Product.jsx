import { useParams } from 'react-router-dom';

import data from '../data';

const Product = () => {
    let { name } = useParams();

    let product = data.find(item => item.name === name);

    let photographer = product.photographer ? `Photo by ${product.photographer}` : '';

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
                </div>
            </section>
        </>
    );
}

export default Product;
