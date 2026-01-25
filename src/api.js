/*import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/gift-shop-backend",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;*/
// api.js
import axios from "axios";

const api = axios.create({
  // Use a relative path so it hits the Vite Proxy
  baseURL: "/gift-shop-backend", 
  headers: {
    "Content-Type": "application/json",
    // This tells ngrok not to show a warning page for this background request
    "ngrok-skip-browser-warning": "true" 
  },
});

export default api;