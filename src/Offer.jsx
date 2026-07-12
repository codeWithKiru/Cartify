import "./Offer.css";
import offerImage from "./assets/offer.jpg";

function Offer() {
  return (
    <section className="offer">

      <div className="offer-text">
        <h2>Summer Sale</h2>

        <p>
          Get up to 50% OFF on selected men's and women's collections.
        </p>

        <button>Shop Sale</button>
      </div>

      <div className="offer-image">
        <img src={offerImage} alt="Summer Sale" />
      </div>

    </section>
  );
}

export default Offer;