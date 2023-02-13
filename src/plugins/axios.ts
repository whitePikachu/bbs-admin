import axios from "axios";
import { ElMessage } from "element-plus";
import router from "./router";
import { API_URL } from "../config";
import {token} from './pinia'
//axios封装
const service = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});
//请求拦截器
service.interceptors.request.use((config) => {
  return config;
});
//响应拦截器
service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status, data, statusCode } = error.response;
    switch (status) {
      case 400:
        ElMessage.error(data.message);
        break;
      case 401:
        ElMessage.error("token失效，请重新登录");
        // token().token = ''
        window.location.href = "/login";
        // router.push("/login");
        break;
      case 403:
        ElMessage.error("没有权限，请联系管理员");
        break;
      case 404:
        ElMessage.error("请求资源不存在");
        break;
      default:
        ElMessage.error(data.message);
    }
    if (statusCode === 400) {
      data.message.forEach((item: any) => {
        item.msg.forEach((msg: any) => {
          ElMessage.error(msg);
        });
      });
    }
    return Promise.reject(error);
  }
);
export default service;
