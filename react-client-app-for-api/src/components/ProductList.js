import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5144/Product/';

const getToken = () => localStorage.getItem('token');

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  },
});

const styles = {
  container: {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '20px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem',
    fontFamily: 'inherit',
  },
  textarea: {
    resize: 'vertical',
    minHeight: '60px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem',
    fontFamily: 'inherit',
  },
  formButtons: {
    marginTop: '10px',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '8px 18px',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.25s ease',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    marginLeft: '10px',
  },
  message: {
    color: '#d9534f',
    fontWeight: 600,
    marginBottom: '15px',
  },
  categoryFilters: {
    marginBottom: '20px',
  },
  categoryButton: (active) => ({
    backgroundColor: active ? '#007bff' : '#eee',
    color: active ? 'white' : '#000',
    border: '1px solid',
    borderColor: active ? '#007bff' : '#ccc',
    borderRadius: '20px',
    padding: '6px 14px',
    marginRight: '10px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.25s ease',
  }),
  productsList: {
    listStyleType: 'none',
    paddingLeft: 0,
  },
  productItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #ddd',
    padding: '15px 0',
  },
  productInfo: {
    maxWidth: '70%',
  },
  productName: {
    fontSize: '1.2rem',
    color: '#007bff',
  },
  productPrice: {
    fontWeight: 'bold',
    color: '#28a745',
  },
  productCategory: {
    fontStyle: 'italic',
    color: '#555',
  },
  productDescription: {
    display: 'block',
    marginTop: '6px',
    color: '#666',
    fontSize: '0.9rem',
  },
  productImage: {
    width: '100px',
    height: 'auto',
    borderRadius: '8px',
    marginLeft: '20px',
    objectFit: 'cover',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  productActions: {
    display: 'flex',
    gap: '8px',
  },
  editBtn: {
    backgroundColor: '#ffc107',
    color: '#212529',
    border: 'none',
    borderRadius: '5px',
    padding: '6px 14px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.25s ease',
  },
  deleteBtn: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '6px 14px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.25s ease',
  },
};

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [formProduct, setFormProduct] = useState({
    productId: 0,
    productName: '',
    description: '',
    price: '',
    category: '',
    imageURL: '',
  });
  const [message, setMessage] = useState('');

  // Fetch all products or by category
  const fetchProducts = (category = '') => {
    const url = category ? `${API_URL}category/${category}` : API_URL;
    axios
      .get(url, getConfig())
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error('Error fetching products:', err);
        alert('Failed to fetch products.');
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    axios
      .delete(`${API_URL}${id}`, getConfig())
      .then(() => {
        setMessage('Product deleted.');
        fetchProducts(categoryFilter);
      })
      .catch((err) => {
        console.error('Error deleting product:', err);
        alert('Failed to delete product. Please check your admin permissions.');
      });
  };

  // Handle input form change
  const handleInputChange = (e) => {
    setFormProduct({ ...formProduct, [e.target.name]: e.target.value });
  };

  // Handle form submit (add or update)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formProduct.productName || !formProduct.price || !formProduct.category) {
      setMessage('Please fill all required fields: Name, Price, Category.');
      return;
    }

    const productData = {
      ...formProduct,
      price: Number(formProduct.price),
    };

    if (formMode === 'add') {
      axios
        .post(API_URL, productData, getConfig())
        .then(() => {
          setMessage('Product added successfully!');
          resetForm();
          fetchProducts(categoryFilter);
        })
        .catch((err) => {
          console.error('Error adding product:', err);
          alert('Failed to add product. Please check your admin permissions.');
        });
    } else if (formMode === 'edit') {
      axios
        .put(`${API_URL}${formProduct.productId}`, productData, getConfig())
        .then(() => {
          setMessage('Product updated successfully!');
          resetForm();
          fetchProducts(categoryFilter);
        })
        .catch((err) => {
          console.error('Error updating product:', err);
          alert('Failed to update product. Please check your admin permissions.');
        });
    }
  };

  // Start editing a product
  const startEdit = (product) => {
    setFormProduct({
      productId: product.productId,
      productName: product.productName,
      description: product.description,
      price: product.price,
      category: product.category,
      imageURL: product.imageURL,
    });
    setFormMode('edit');
    setMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset form to add mode
  const resetForm = () => {
    setFormProduct({
      productId: 0,
      productName: '',
      description: '',
      price: '',
      category: '',
      imageURL: '',
    });
    setFormMode('add');
    setMessage('');
  };

  return (
    <div style={styles.container}>
      <h2>Product List</h2>

      <h3>{formMode === 'add' ? 'Add New Product' : 'Edit Product'}</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="productName"
          placeholder="Product Name *"
          value={formProduct.productName}
          onChange={handleInputChange}
          required
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formProduct.description}
          onChange={handleInputChange}
          style={styles.textarea}
        />
        <input
          type="number"
          name="price"
          placeholder="Price *"
          value={formProduct.price}
          onChange={handleInputChange}
          required
          min="0"
          step="0.01"
          style={styles.input}
        />
        <input
          type="text"
          name="category"
          placeholder="Category *"
          value={formProduct.category}
          onChange={handleInputChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="imageURL"
          placeholder="Image URL"
          value={formProduct.imageURL}
          onChange={handleInputChange}
          style={styles.input}
        />
        <div style={styles.formButtons}>
          <button type="submit" style={styles.button}>
            {formMode === 'add' ? 'Add Product' : 'Update Product'}
          </button>
          {formMode === 'edit' && (
            <button
              type="button"
              onClick={resetForm}
              style={{ ...styles.button, ...styles.cancelButton }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      {message && <p style={styles.message}>{message}</p>}

      <div style={styles.categoryFilters}>
        {['', 'Woman', 'Men', 'Kids', 'Beauty'].map((cat) => (
          <button
            key={cat || 'all'}
            onClick={() => {
              setCategoryFilter(cat);
              fetchProducts(cat);
            }}
            style={styles.categoryButton(categoryFilter === cat)}
          >
            {cat || 'All'}
          </button>
        ))}
      </div>

      <ul style={styles.productsList}>
        {products.length === 0 && <li>No products found.</li>}
        {products.map((product) => (
          <li key={product.productId} style={styles.productItem}>
            <div style={styles.productInfo}>
              <strong style={styles.productName}>{product.productName}</strong>{' '}
              <span style={styles.productPrice}>(RS{product.price.toFixed(2)})</span> -{' '}
              <span style={styles.productCategory}>{product.category}</span>
              <br />
              {product.description && (
                <small style={styles.productDescription}>{product.description}</small>
              )}
            </div>
            {product.imageURL && (
              <img
                src={product.imageURL}
                alt={product.productName}
                style={styles.productImage}
              />
            )}
            <div style={styles.productActions}>
              <button
                onClick={() => startEdit(product)}
                style={styles.editBtn}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e0a800')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ffc107')}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.productId)}
                style={styles.deleteBtn}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
