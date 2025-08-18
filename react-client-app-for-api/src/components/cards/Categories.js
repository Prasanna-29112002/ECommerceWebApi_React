// src/components/cards/Categories.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductService from '../../services/ProductService';
// import jean from "../../images/Jeans.jpg4";
// import myImage from "../../images/Jeans.jpg4";
// import myImage from "../../images/Jeans.jpg4";
// import myImage from "../../images/Jeans.jpg4";


function Categories({ onAddToCart }) {

  const productImage = {
    Jeans: "./images/Jeans.jpg",
    Tops:"./images/Tops.jpg",
      Shirt:"./images/Shirts.jpg",
      Trouserds:"./images/Trousers.jpg",
      FlaredDresses:"./images/FlaredDresses.jpg",
      Jumpsuits:"./images/Jumpsuits.jpg",
      Sunscreen:"./images/Sunscreen.jpg",
      FaceWash:"./images/FaceWash.webp",
      Slippers:"./images/Slippers.webp",
      Earrings:"./images/Earrings.webp",
      Necklace:"./images/Necklace.webp",
      Sneakers:"./images/Sneakers.webp",
      Palazzos:"./images/Palazzos.jpg",
      NightSuit:"./images/NightSuit.webp",
      KurtaSet :"./images/KurtaSet.webp",
      Sneaker :"./images/Sneaker.webp",
      TShirts :"./images/T-Shirts.webp",
      DenimJeans :"./images/DenimJeans.webp",
      CargoShorts :"./images/CargoShorts.webp",
      Watch :"./images/Watch.webp",
      Swimwear:"./images/Swimwear.webp",
      Jacket :"./images/Jacket.webp",
      Shoes :"./images/Shoes.webp",
      NecklaceSet :"./images/NecklaceSet.webp",
      Bracelet :"./images/Bracelet.webp",
      MilkyFaceCream :"./images/MilkyFaceCream.webp",
      KidsWatch :"./images/KidsWatch.webp",
      Foundation :"./images/Foundation.webp",
      MakeupBrushes :"./images/MakeupBrushes.webp",
      Primer:"./images/Primer.jpg",
      MakeupBrushes :"./images/MakeupBrushes.webp",
      Shampoo:"./images/Shampoo.webp",
      Eyeliner:"./images/Eyeliner.webp",
      LipBalm:"./images/LipBalm.webp",
      FacePower:"./images/FacePower.webp",
      
     
  }


  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5144/Category", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryName) => {
    setSelectedCategory(categoryName);
    try {
      const response = await ProductService.getProductsByCategory(categoryName);
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Categories</h4>
      <div className="row mb-4">
        {categories.map((category) => (
          <div className="col-md-3 mb-2" key={category.categoryId}>
            <button
              className="btn btn-outline-primary w-100"
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </button>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <>
          <h5>Products in "{selectedCategory}"</h5>
          <div className="row">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.productId} className="col-md-3 mb-3">
                  <div className="card h-100">
                    <img
                      src={productImage[product.productName] ||"./images/Sunscreen.jpg"}
                      alt="Product"
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title">{product.productName}</h6>
                      <p className="card-text">{product.description}</p>
                      <p className="card-text text-success">Rs. {product.price}/-</p>
                      <button
                        className="btn btn-sm btn-primary mt-auto"
                        onClick={() => {
                          onAddToCart(product);
                          alert("Product added to cart!");
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Categories;
