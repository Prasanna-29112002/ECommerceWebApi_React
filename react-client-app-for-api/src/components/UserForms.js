import React, { useState, useEffect } from 'react';
import {
  registerUser,
  loginUser,
  getAllUsers,
  getProfile,
  updateUserDetails,
  deleteUser,
  getAgentAccess,
  getManagerAccess
} from '../services/UserService';

function UserForms() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState(null);
  const [agentData, setAgentData] = useState(null);
  const [managerData, setManagerData] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
  try {
    await registerUser(form);    // <-- Sends POST request to backend with user data
    alert('Registered!');
    // fetchUsers();                // <-- Fetches updated users list from backend
  } catch (err) {
    alert('Registration failed: ' + err.message);
  }
};


  // const handleLogin = async () => {
  //   await loginUser(form.email, form.password);
  //   alert('Logged in!');
  // };

  // const fetchUsers = async () => {
  //   const data = await getAllUsers();
  //   setUsers(data);
  // };

  // const fetchProfile = async () => {
  //   const data = await getProfile();
  //   setProfile(data);
  // };

  // const handleUpdate = async () => {
  //   await updateUserDetails(form);
  //   alert('Updated!');
  // };

  // const handleDelete = async () => {
  //   await deleteUser(form.userId);
  //   alert('Deleted!');
  // };

  // const fetchAgentAccess = async () => {
  //   const data = await getAgentAccess();
  //   setAgentData(data);
  // };

  // const fetchManagerAccess = async () => {
  //   const data = await getManagerAccess();
  //   setManagerData(data);
  // };

  return (
    <div>
      <h2>User Operations</h2>

      <h3>Register</h3>
      <input name="name" onChange={handleChange} placeholder="Name" />
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="password" onChange={handleChange} placeholder="Password" />
      <input name="contactNumber" onChange={handleChange} placeholder="Contact Number" />
      <input name="role" onChange={handleChange} placeholder="Role" />
      <button onClick={handleRegister}>Register</button>

      <h3>Login</h3>
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="password" onChange={handleChange} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>

      <h3>Get All Users</h3>
      <button onClick={fetchUsers}>Fetch Users</button>
      <ul>{users.map(u => <li key={u.userId}>{u.email} - {u.role}</li>)}</ul>

      <h3>My Profile</h3>
      <button onClick={fetchProfile}>Fetch Profile</button>
      {profile && <div>{profile.email} - {profile.role}</div>}

      <h3>Update Profile</h3>
      <input name="email" onChange={handleChange} placeholder="New Email" />
      <input name="password" onChange={handleChange} placeholder="New Password" />
      <input name="contactNumber" onChange={handleChange} placeholder="New Contact" />
      <button onClick={handleUpdate}>Update</button>

      <h3>Delete User</h3>
      <input name="userId" onChange={handleChange} placeholder="User ID" />
      <button onClick={handleDelete}>Delete</button>

      {/* <h3>Travel Agent Access</h3>
      <button onClick={fetchAgentAccess}>Fetch Agent Access</button>
      {agentData && (
        <>
          <p>Agent: {agentData.currentUser.email}</p>
          <ul>{agentData.travelers.map(t => <li key={t.userId}>{t.email}</li>)}</ul>
        </>
      )} */}

      {/* <h3>Hotel Manager Access</h3>
      <button onClick={fetchManagerAccess}>Fetch Manager Access</button>
      {managerData && (
        <>
          <p>Manager: {managerData.currentUser.email}</p>
          <ul>{managerData.travelers.map(t => <li key={t.userId}>{t.email}</li>)}</ul>
        </>
      )} */}
    </div>
  );
}

export default UserForms;
