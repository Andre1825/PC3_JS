import axios from 'axios';

/**
 * Cliente Axios centralizado hacia la pasarela Spring Boot.
 * React NUNCA llama a Python (8001) directamente: siempre pasa por Spring Boot (8080).
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 8000,
});

export default apiClient;
