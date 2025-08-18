import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://localhost:5144/Product';

class ProductService {
  getHeaders() {
    const token = AuthService.getToken();
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  }

  getProductsByCategory(categoryName) {
    return axios.get(`${API_URL}/category/${categoryName}`, this.getHeaders());
  }

  getProducts() {
    return axios.get(API_URL, this.getHeaders());
  }

  // You can also add create/update/delete methods here
}

export default new ProductService();
