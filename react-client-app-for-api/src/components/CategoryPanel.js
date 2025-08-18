import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5144/Category";

const getConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

function CategoryPanel() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_BASE);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  // Add category
  const addCategory = async () => {
    if (!newCategory.trim()) {
      alert("Please enter category name");
      return;
    }
    try {
      await axios.post(`${API_BASE}/AddingNewCategory`, { name: newCategory }, getConfig());
      setNewCategory("");
      fetchCategories();
    } catch (err) {
      console.error("Error adding category", err);
    }
  };

  // Update category
  const updateCategory = async (id) => {
    try {
      await axios.put(`${API_BASE}/UpdateCategory?id=${id}`, { categoryId: id, name: editName }, getConfig());
      setEditId(null);
      setEditName("");
      fetchCategories();
    } catch (err) {
      console.error("Error updating category", err);
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`${API_BASE}/DeleteCategory?id=${id}`, getConfig());
        fetchCategories();
      } catch (err) {
        console.error("Error deleting category", err);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Categories</h2>

      {/* Add Form */}
      <div className="d-flex mb-3">
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="form-control me-2"
        />
        <button className="btn btn-success" onClick={addCategory}>
          Add Category
        </button>
      </div>

      {/* Table */}
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Category Id</th>
            <th>Name</th>
            <th style={{ width: "200px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <tr key={cat.categoryId}>
                <td>{cat.categoryId}</td>
                <td>
                  {editId === cat.categoryId ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="form-control"
                    />
                  ) : (
                    cat.name
                  )}
                </td>
                <td>
                  {editId === cat.categoryId ? (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => updateCategory(cat.categoryId)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setEditId(null);
                          setEditName("");
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => {
                          setEditId(cat.categoryId);
                          setEditName(cat.name);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteCategory(cat.categoryId)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryPanel;
