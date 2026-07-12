import "./Category.css";

import men from "./assets/categories/men.jpg";
import women from "./assets/categories/women.jpg";
import kids from "./assets/categories/kids.jpg";
import accessories from "./assets/categories/accessories.jpg";

function Category() {

  const categories = [
    {
      image: men,
      title: "Men"
    },

    {
      image: women,
      title: "Women"
    },

    {
      image: kids,
      title: "Kids"
    },

    {
      image: accessories,
      title: "Accessories"
    }
  ];

  return (
    <section className="category">

      <h2>Shop by Category</h2>

      <div className="category-grid">

        {categories.map((item, index) => (

          <div className="category-card" key={index}>

            <img src={item.image} alt={item.title} />

            <h3>{item.title}</h3>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Category;