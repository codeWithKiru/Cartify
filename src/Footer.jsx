import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section">
          <h2>Cartify</h2>
          <p>
            Your one-stop destination for stylish men's and women's fashion.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Categories</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>

          <p>Email: support@cartify.com</p>
          <p>Phone: +91 9876543210</p>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 Cartify. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;