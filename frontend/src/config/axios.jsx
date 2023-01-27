import axios from "axios";

const makeRequest = axios.create({
  baseURL: import.meta.env.VITE_APIURL
})

export default makeRequest