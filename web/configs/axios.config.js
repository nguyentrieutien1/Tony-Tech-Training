const axiosConfig = {
  baseURL: "http://localhost:3000", // Đổi thành URL của API của bạn
  timeout: 5000, // Thời gian chờ tối đa (milliseconds)
  headers: {
    "Content-Type": "application/json",
  },
};

const instanceAxios = axios.create(axiosConfig);

// Xử lý các interceptors cho request và response
instanceAxios.interceptors.request.use(
  (config) => {
    // Thêm xử lý trước khi gửi request
    return config;
  },
  (error) => {
    // Xử lý lỗi khi gửi request
    return Promise.reject(error);
  }
);

instanceAxios.interceptors.response.use(
  (response) => {
    // Xử lý dữ liệu response
    return response;
  },
  (error) => {
    // Xử lý lỗi response
    return Promise.reject(error);
  }
);

export { instanceAxios };
