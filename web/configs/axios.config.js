const axiosConfig = {
  baseURL: "http://localhost:3000", 
  timeout: 5000, 
  headers: {
    "Content-Type": "application/json",
  },
};

const instanceAxios = axios.create(axiosConfig);

instanceAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instanceAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { instanceAxios };
