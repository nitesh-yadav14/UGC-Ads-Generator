import axios from "axios"

const api = axios.create({
baseURL:
import.meta.env.VITE_API_URL ||
"https://ugc-ads-generator-backend.onrender.com",
})

export default api
