import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Categories from "../components/cards/Categories";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import CategoryPanel from "./CategoryPanel"; // import CategoryPanel

function Welcome({ logout }) {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [showCategoryPanel, setShowCategoryPanel] = useState(false);

  // New state for all products
  const [allProducts, setAllProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (!token || !email) {
      const tempCart = localStorage.getItem("tempCart");
      if (tempCart) {
        setCartItems(JSON.parse(tempCart));
      }
      setCartLoaded(true);
      return;
    }

    try {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const role = tokenData.role || "User";
      const endpoint =
        role === "Admin"
          ? `http://localhost:5144/Admin/Profile?email=${email}`
          : `http://localhost:5144/User/Profile?email=${email}`;

      axios
        .get(endpoint, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          const fetchedUser = res.data;
          setUser({ ...fetchedUser, role });
          setFormData(fetchedUser);

          const userCartKey = `cartItems_${fetchedUser.userId || fetchedUser.adminId}`;
          const savedUserCart = localStorage.getItem(userCartKey);
          const tempCart = localStorage.getItem("tempCart");

          if (savedUserCart && JSON.parse(savedUserCart).length > 0) {
            setCartItems(JSON.parse(savedUserCart));
          } else if (tempCart && JSON.parse(tempCart).length > 0) {
            setCartItems(JSON.parse(tempCart));
            localStorage.setItem(userCartKey, tempCart);
          }
          setCartLoaded(true);
        })
        .catch(() => navigate("/login"));
    } catch {
      logout();
    }
  }, [navigate, logout]);

  // Fetch all products when component mounts
  useEffect(() => {
    const fetchAllProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5144/Product", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch all products:", error);
      }
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (!cartLoaded) return;

    localStorage.setItem("tempCart", JSON.stringify(cartItems));
    if (user?.userId || user?.adminId) {
      localStorage.setItem(
        `cartItems_${user.userId || user.adminId}`,
        JSON.stringify(cartItems)
      );
    }
  }, [cartItems, user, cartLoaded]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateProfile = () => {
    const token = localStorage.getItem("token");
    const role = user.role || "User";
    const id = user.userId || user.adminId;

    const endpoint =
      role === "Admin"
        ? `http://localhost:5144/Admin/Update?id=${id}`
        : `http://localhost:5144/User/Update?id=${id}`;

    axios
      .put(endpoint, formData, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setUser({ ...formData, role });
        setEditMode(false);
        alert("Profile updated successfully!");
      })
      .catch(() => alert("Failed to update profile"));
  };

  const handleDeleteAccount = () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    )
      return;

    const token = localStorage.getItem("token");
    const role = user.role || "User";
    const id = user.userId || user.adminId;

    const endpoint =
      role === "Admin"
        ? `http://localhost:5144/Admin/Delete?id=${id}`
        : `http://localhost:5144/User/Delete?id=${id}`;

    axios
      .delete(endpoint, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        alert("Account deleted successfully.");
        logout();
      })
      .catch(() => alert("Failed to delete account"));
  };

  // Product images mapping (same as in Categories.js)
  const productImage = {
    Jeans: "./images/Jeans.jpg",
    Tops: "./images/Tops.jpg",
    Shirt: "./images/Shirts.jpg",
    Trouserds: "./images/Trousers.jpg",
    FlaredDresses: "./images/FlaredDresses.jpg",
    Jumpsuits: "./images/Jumpsuits.jpg",
    Sunscreen: "./images/Sunscreen.jpg",
    FaceWash: "./images/FaceWash.webp",
    Slippers: "./images/Slippers.webp",
    Earrings: "./images/Earrings.webp",
    Necklace: "./images/Necklace.webp",
    Sneakers: "./images/Sneakers.webp",
    Palazzos: "./images/Palazzos.jpg",
    NightSuit: "./images/NightSuit.webp",
    KurtaSet: "./images/KurtaSet.webp",
    Sneaker: "./images/Sneaker.webp",
    TShirts: "./images/T-Shirts.webp",
    DenimJeans: "./images/DenimJeans.webp",
    CargoShorts: "./images/CargoShorts.webp",
    Watch: "./images/Watch.webp",
    Swimwear: "./images/Swimwear.webp",
    Jacket: "./images/Jacket.webp",
    Shoes: "./images/Shoes.webp",
    NecklaceSet: "./images/NecklaceSet.webp",
    Bracelet: "./images/Bracelet.webp",
    MilkyFaceCream: "./images/MilkyFaceCream.webp",
    KidsWatch: "./images/KidsWatch.webp",
    Foundation: "./images/Foundation.webp",
    MakeupBrushes: "./images/MakeupBrushes.webp",
    Primer: "./images/Primer.jpg",
    Shampoo: "./images/Shampoo.webp",
    Eyeliner: "./images/Eyeliner.webp",
    LipBalm: "./images/LipBalm.webp",
    FacePower: "./images/FacePower.webp",
  };

  return (
    <div className="container-fluid mt-3">
      <div className="border border-2 p-4 mb-4 d-flex justify-content-between">
        <h2>Welcome to the Dashboard</h2>
        <div>
          {user?.role === "Admin" && (
            <>
              <button
                className="btn btn-outline-dark me-2"
                onClick={() => navigate("/adminpanel")}
              >
                Admin Panel
              </button>
              <button
                className="btn btn-outline-info me-2"
                onClick={() => navigate("/productlist")}
              >
                Product List
              </button>
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => navigate("/categorypanel")}
              >
                Category Panel
              </button>
            </>
          )}

          <button
            className="btn btn-outline-primary me-2"
            onClick={() => setShowProfile(true)}
          >
            My Profile
          </button>
          <button
            className="btn btn-outline-success me-2"
            onClick={() => setShowCart(true)}
          >
            Cart ({cartItems.length})
          </button>
          <button className="btn btn-outline-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {showProfile && user && (
        <div className="card p-3 shadow mb-4">
          <h3>My Profile</h3>
          {editMode ? (
            <>
              {Object.keys(formData).map(
                (key) =>
                  key.toLowerCase().includes("id") || key === "role" ? null : (
                    <div key={key} className="mb-2">
                      <label className="form-label">{key}</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData[key] || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                      />
                    </div>
                  )
              )}
              <button className="btn btn-success me-2" onClick={handleUpdateProfile}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              {Object.entries(user).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
              <div className="d-flex">
                <button
                  className="btn btn-warning me-2 btn-sm"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
                <button
                  className="btn btn-danger me-2 btn-sm"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowProfile(false)}
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {showCart && (
        <div className="card p-3 shadow mb-4">
          <h3>Your Cart</h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="list-group">
              {cartItems.map((item, i) => (
                <li key={i} className="list-group-item">
                  <strong>{item.productName}</strong> - Rs {item.price}
                  <p className="mb-1">{item.description}</p>
                  <button
                    className="btn btn-sm btn-danger float-end"
                    onClick={() => handleRemoveFromCart(i)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Your existing Categories component */}
      <Categories onAddToCart={handleAddToCart} />

      {/* Display all products below Categories */}
      <div className="mt-4">
        <h4>All Products</h4>
        <div className="row">
          {allProducts.length > 0 ? (
            allProducts.map((product) => (
              <div key={product.productId} className="col-md-3 mb-3">
                <div className="card h-100">
                  <img
                    src={productImage[product.productName] || "./images/Sunscreen.jpg"}
                    alt={product.productName}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title">{product.productName}</h6>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text text-success">Rs. {product.price}/-</p>
                    <button
                      className="btn btn-sm btn-primary mt-auto"
                      onClick={() => {
                        handleAddToCart(product);
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
            <p>No products available.</p>
          )}
        </div>
      </div>

      {/* Conditionally render CategoryPanel below */}
      {showCategoryPanel && user?.role === "Admin" && <CategoryPanel />}
    </div>
  );
}

export default Welcome;
