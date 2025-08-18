import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';

function ProductForm() {
  const [product, setProduct] = useState({
    productName: '',
    price: '',
    description: '',
    imageURL: '',
    categoryId: ''
  });
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    ProductService.getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error('Error loading categories', err);
      });

    if (id) {
      ProductService.getProduct(id)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          console.error('Error loading product', err);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      ProductService.updateProduct(id, product)
        .then(() => navigate('/'))
        .catch((err) => console.error('Error updating product', err));
    } else {
      ProductService.addProduct(product)
        .then(() => navigate('/'))
        .catch((err) => console.error('Error adding product', err));
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} Product</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={product.description}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div>
            <label>
              Image URL:
              <input
                type="text"
                name="imageURL"
                value={product.imageURL}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div>
            <label>
              Category:
              <select
                name="categoryId"
                value={product.categoryId}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <button type="submit">{id ? 'Update' : 'Add'} Product</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default ProductForm;
