import axios from 'axios';

export const registerUser = async (user) => {
  return await axios.post('http://localhost:5144/User/Register', user);
};

export const loginUser = async (email, password) => {
  return await axios.post('/User/Login', null, {
    params: { Email: email, Password: password }
  });
};

export const getallProfile = async () => {
  const response = await axios.get('http://localhost:5144/User/Profile');
  return response.data;
};
export const getadminProfile = async () => {
  const response = await axios.get('http://localhost:5144/Admin/Profile');
  return response.data;
};

export const updateUserDetails = async ({ email, password, contactNumber }) => {
  return await axios.patch('/User/UpdateDetails', {
    email,
    password,
    contactNumber
  });
};

export const deleteUser = async (userId) => {
  return await axios.delete('/User/Delete User', {
    data: { userId }
  });
};

export const getAgentAccess = async () => {
  const response = await axios.get('/User/agent-access');
  return response.data;
};

export const getManagerAccess = async () => {
  const response = await axios.get('/User/manager-access');
  return response.data;
};


