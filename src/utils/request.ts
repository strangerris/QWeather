// src/utils/request.js
import axios from 'axios';
import { Message } from '@arco-design/web-react'; // 可选：用于显示错误提示

// 创建 axios 实例
const service = axios.create({
    baseURL: '/api', // API 基础路径
    timeout: 10000, // 请求超时时间
    headers: {
        // 'Content-Type': 'application/json;charset=utf-8'
    }
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求前做些什么
        // 例如：添加认证 token
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    error => {
        // 处理请求错误
        console.error('请求错误:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 对响应数据做些什么
        const res = response.data;

        // 根据业务状态码判断请求是否成功
        if (res.code !== '200') {
            Message.error(res.message || '请求失败');
            return Promise.reject(new Error(res.message || '请求失败'));
        }

        return res; // 直接返回业务数据
    },
    error => {
        // 处理响应错误
        const { response } = error;
        console.log("res error");
        
        if (response) {
            // HTTP 状态码处理
            const status = response.status;
            const msg = response.data.message || '服务器错误';

            switch (status) {
                case 401:
                    Message.error('未授权，请重新登录');
                    // 跳转到登录页
                    break;
                case 403:
                    Message.error('拒绝访问');
                    break;
                case 404:
                    Message.error('请求资源不存在');
                    break;
                case 500:
                    Message.error('服务器内部错误');
                    break;
                default:
                    Message.error(`请求错误 ${status}: ${msg}`);
            }
        } else {
            Message.error('网络连接失败');
        }

        return Promise.reject(error);
    }
);

const geoService = axios.create({
    baseURL: "/geoJson", // API 基础路径
    timeout: 10000, // 请求超时时间
    headers: {
        // 'Content-Type': 'application/json;charset=utf-8'
    }
})

export const geoRequest = {
    get(url) {
        return geoService.get(url);
    }
}
// 封装通用请求方法
export const request = {
    get(url, params = {}) {
        return service.get(url, { params });
    },
    getJson(url, params = {}) {
        return service.get(url, { params, headers: { 'Accept': 'application/json' } });
    },
    post(url, data = {}) {
        return service.post(url, data);
    },

    put(url, data = {}) {
        return service.put(url, data);
    },

    delete(url, params = {}) {
        return service.delete(url, { params });
    },

};

export default request;
