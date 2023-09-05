import { API_URL } from "@/constants/apiUrl";
import { headersInfo } from "@/utils/headerInfo";
import axios from "axios";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: headersInfo(),
});
export { apiClient };
