import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({
    name: "",
    role: "",
    permissions: "",
    email: "",
    password: ""
  });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");
  const API_URL = "http://localhost:5144/Admin";

  const fetchAdmins = () => {
    axios
      .get(`${API_URL}/ListofAdmins`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setAdmins(res.data))
      .catch((err) => console.error("Error fetching admins:", err));
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createAdmin = () => {
    axios
      .post(`${API_URL}/CreateAdmin`, form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        setForm({ name: "", role: "", permissions: "", email: "", password: "" });
        fetchAdmins();
      })
      .catch((err) => console.error("Error creating admin:", err));
  };

  const deleteAdmin = (id) => {
    axios
      .delete(`${API_URL}/Delete?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => fetchAdmins())
      .catch((err) => console.error("Error deleting admin:", err));
  };

  const startEdit = (admin) => {
    setForm({
      name: admin.name,
      role: admin.role,
      permissions: admin.permissions,
      email: admin.email,
      password: ""
    });
    setEditingId(admin.adminId);
  };

  const updateAdmin = () => {
    axios
      .put(`${API_URL}/Update?id=${editingId}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        setForm({ name: "", role: "", permissions: "", email: "", password: "" });
        setEditingId(null);
        fetchAdmins();
      })
      .catch((err) => console.error("Error updating admin:", err));
  };

  return (
    <>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f6fa;
          margin: 0;
          padding: 0;
        }
        .admin-panel {
          max-width: 1100px;
          margin: auto;
          background: white;
          padding: 20px 30px;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }
        .admin-panel h2 {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 25px;
        }
        .admin-form {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }
        .admin-form input {
          flex: 1 1 180px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          transition: 0.2s;
        }
        .admin-form input:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 5px rgba(52, 152, 219, 0.4);
        }
        .admin-form button {
          padding: 10px 16px;
          background: #3498db;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          transition: 0.2s;
        }
        .admin-form button:hover {
          background: #2980b9;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        .admin-table thead {
          background: #3498db;
          color: white;
        }
        .admin-table th, .admin-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        .admin-table tbody tr:hover {
          background: #f1f9ff;
        }
        .action-btn {
          padding: 6px 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .edit-btn {
          background: #f1c40f;
          color: white;
        }
        .edit-btn:hover {
          background: #d4ac0d;
        }
        .delete-btn {
          background: #e74c3c;
          color: white;
        }
        .delete-btn:hover {
          background: #c0392b;
        }
        .empty-message {
          text-align: center;
          color: #888;
          padding: 20px;
        }
      `}</style>

      <div className="admin-panel">
        <h2>Admin Panel</h2>

        <div className="admin-form">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <input name="role" placeholder="Role" value={form.role} onChange={handleChange} />
          <input name="permissions" placeholder="Permissions" value={form.permissions} onChange={handleChange} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
          {editingId ? (
            <button onClick={updateAdmin}>Update Admin</button>
          ) : (
            <button onClick={createAdmin}>Create Admin</button>
          )}
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Permissions</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.length > 0 ? (
              admins.map((admin) => (
                <tr key={admin.adminId}>
                  <td>{admin.adminId}</td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>{admin.role}</td>
                  <td>{admin.permissions}</td>
                  <td>
                    <button className="action-btn edit-btn" onClick={() => startEdit(admin)}>Edit</button>
                    <button className="action-btn delete-btn" onClick={() => deleteAdmin(admin.adminId)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-message">No admins found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
