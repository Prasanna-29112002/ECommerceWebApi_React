import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'https://humble-orbit-x54467p475652r65-5144.app.github.dev/api/Category';

class CategoryService {
  getHeaders() {
    const token = AuthService.getToken();
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  }

  getCategories() {
    return axios.get(API_URL, this.getHeaders());
  }

  // other methods ...
}

export default new CategoryService();
 
