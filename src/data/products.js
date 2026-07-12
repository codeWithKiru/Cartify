import jacket from "../assets/jacket.jpg";
import tshirt from "../assets/tshirt.jpg";
import jeans from "../assets/jeans.jpg";
import dress from "../assets/dress.jpg";

const products = [
  {
    id: 1,
    image: jacket,
    name: "Winter Jacket",
    brand: "Nike",
    price: 1999,
    originalPrice: 2499,
    discount: 20,
    category: "Men",
    description: "Premium winter jacket with comfortable fit.",
    rating: 4.8,
    stock: true,
    badge: "SALE"
  },
  {
    id: 2,
    image: tshirt,
    name: "Cotton T-Shirt",
    brand: "Adidas",
    price: 799,
    originalPrice: 999,
    discount: 20,
    category: "Men",
    description: "Soft cotton t-shirt for everyday wear.",
    rating: 4.5,
    stock: true,
    badge: "NEW"
  },
  {
    id: 3,
    image: jeans,
    name: "Slim Fit Jeans",
    brand: "Levi's",
    price: 1499,
    originalPrice: 1899,
    discount: 21,
    category: "Men",
    description: "Slim fit stretch denim jeans.",
    rating: 4.7,
    stock: false,
    badge: "SALE"
  },
  {
    id: 4,
    image: dress,
    name: "Floral Dress",
    brand: "Zara",
    price: 2499,
    originalPrice: 2999,
    discount: 17,
    category: "Women",
    description: "Elegant floral dress for casual occasions.",
    rating: 4.9,
    stock: true,
    badge: "NEW"
  }
];

export default products;