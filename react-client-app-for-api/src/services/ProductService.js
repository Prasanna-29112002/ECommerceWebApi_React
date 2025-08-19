import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'https://humble-orbit-x54467p475652r65-5144.app.github.dev/Product';

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
