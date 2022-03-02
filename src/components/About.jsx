const About = () => {
    return (
        <section className="about">
            <div className="about__container">
                <img src="images/bouquet.jpg" alt="Bouquet" className="about__image" />
                <h2 className="about__heading">
                    <span className="about__heading--fragment-one">Personalize </span>
                    <span className="about__heading--fragment-two">Your </span>
                    <span className="about__heading--fragment-three">Bouquet</span>
                </h2>
                <p>Founded in 2022, Flower Shop offers home-grown flowers for any occasion</p>
            </div>
            <p>Photo by <a href="https://pixnio.com/author/milim84">Marko Milivojevic</a></p>
        </section>
    )
};

export default About;