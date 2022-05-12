import { useQuery, gql } from "@apollo/client";

const About = () => {

    const FETCH_REVIEWS = gql`
        query FetchReviews (
            $options: PageQueryOptions
        ) {
            posts(options: $options) {
                data {
                    id,
                    title,
                    body
                }
            }
        }
    `;

    const { loading, error, data } = useQuery(FETCH_REVIEWS, {
        variables: {
            options: {
                paginate: {
                    page: 1,
                    limit: 5
                }
            }
        }
    });

    return (
        <section className="about">
            <div className="about__container">
                <div className="about__image-container">
                <div className="about__image-overlay-container">
                    <img src="images/bouquet.jpg" alt="Bouquet" className="about__image" />
                    <h2 className="about__heading">
                        <span className="about__heading--fragment-one">Personalize </span>
                        <span className="about__heading--fragment-two">Your </span>
                        <span className="about__heading--fragment-three">Bouquet</span>
                    </h2>
                </div>
                <p className="about__image-credit">Photo by <a href="https://pixnio.com/author/milim84">Marko Milivojevic</a></p>
                </div>
                <div className="about__text-container">
                    <h2>About Flower Shop</h2>
                    <p>Founded in 2022, Flower Shop offers homegrown flowers for any occasion</p>
                    <p>You decide what flowers go into your personal bouquets.</p>
                    <p>Our shop offers:</p>
                    <ul>
                        <li>Roses</li>
                        <li>Daffodils</li>
                        <li>Tulips</li>
                        <li>Lilies</li>
                        <li>Daisies</li>
                        <li>Carnations</li>
                        <li>... and more</li>
                    </ul>
                    <p>All of our products come at affordable prices.</p>
                </div>
            </div>
            <div className="customer-reviews__container">
                <h2>Customer Reviews</h2>
                {
                    loading ?
                        <p>Loading Reviews...</p> :
                        error ? <p>Error</p> :
                            data.posts.data.map(({ id, title, body }) => (
                                <div className="customer-review" key={id}>
                                    <h3 style={{margin:"0"}}>{title}</h3>
                                    <p>{body}</p>
                                </div>
                            ))
                }
            </div>
        </section>
    )
};

export default About;