import axios from 'axios';

export const registerUser = async (user) => {
  return await axios.post('https://humble-orbit-x54467p475652r65-5144.app.github.dev/api/User/Register', user);
};

export const loginUser = async (email, password) => {
  return await axios.post('/User/Login', null, {
    params: { Email: email, Password: password }
  });
};

export const getallProfile = async () => {
  const response = await axios.get('https://humble-orbit-x54467p475652r65-5144.app.github.dev/api/User/Profile');
  return response.data;
};
export const getadminProfile = async () => {
  const response = await axios.get('https://humble-orbit-x54467p475652r65-5144.app.github.dev/api/Admin/Profile');
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


