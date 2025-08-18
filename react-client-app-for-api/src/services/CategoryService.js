import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://localhost:5144/Category';

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
 
