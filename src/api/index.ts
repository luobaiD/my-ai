import axios from 'axios';

// 创建一个 axios 实例
const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000 * 60 *60, // 请求超时时间
});

// 请求拦截器
http.interceptors.request.use(
  async (config: any) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(`请求错误: ${error}`);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response: any) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    if (error.response) {
      // 响应已收到，但状态码不在 2xx 范围内
      switch (error.response.status) {
        case 401:
          // 处理未授权错误，例如跳转到登录页面
          console.log('未授权，请登录');
          break;
        case 404:
          // 处理资源未找到错误
          console.log('请求的资源未找到');
          break;
        case 500:
          // 处理服务器内部错误
          console.log('服务器内部错误');
          break;
      }
    } else if (error.request) {
      // 请求已发送，但没有收到响应
      console.log('没有收到服务器响应');
    } else {
      // 在设置请求时发生错误
      console.log('请求设置错误:', error.message);
    }
    return Promise.reject(error);
  }
);

export default http;