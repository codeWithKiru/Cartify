import "./Hero.css";
import heroImage from "./assets/hero.png";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <span className="hero-tag">
          🔥 NEW COLLECTION 2026
        </span>

        <h1>
          Elevate Your
          <br />
          Fashion Style
        </h1>

        <p>
          Discover premium clothing for men and women.
          Shop the newest arrivals with exclusive offers
          and free shipping on your first order.
        </p>

        <div className="hero-buttons">

          <button className="shop-btn">
            Shop Now
          </button>

          <button className="explore-btn">
            Explore
          </button>

        </div>

      </div>

      <div className="hero-image">

        <img
          src={heroImage}
          alt="Fashion Banner"
        />

      </div>

    </section>
  );
}

export default Hero;