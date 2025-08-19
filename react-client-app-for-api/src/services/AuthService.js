import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const API_URL = 'https://humble-orbit-x54467p475652r65-5144.app.github.dev/api/auth'; // Adjust the URL as necessary

class AuthService {
  

  login(email, password) {
    return axios.post(`${API_URL}/`, { email, password })
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('email',email);
        return token;
      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    if(AuthService.isLocalStorageAvailable())
      {
    return localStorage.getItem('token');
      }
      return null;
  }

  getUserFromToken(token) {
    return jwtDecode(token);
  }
  static isLocalStorageAvailable() {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}
const authServiceInstance = new AuthService();
export default authServiceInstance;
//export default new AuthService();
