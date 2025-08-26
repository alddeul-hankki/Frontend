import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_DDANGYO_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_LOGIN_TOKEN}`,
        'uuid-token': import.meta.env.VITE_UUID_TOKEN
    },
});

// POST 요청만 할 수 있는 유틸리티 함수
export const post = async (endpoint, body) => {
    const response = await api.post(endpoint, body);
    return response.data;
};

// GET 요청
export const get = async (endpoint, params = {}) => {
    const response = await api.get(endpoint, { params });
    return response.data;
};

// PUT 요청
export const put = async (endpoint, body) => {
    const response = await api.put(endpoint, body);
    return response.data;
};

// PATCH 요청
export const patch = async (endpoint, body) => {
    const response = await api.patch(endpoint, body);
    return response.data;
};

// DELETE 요청
export const del = async (endpoint, body = {}) => {
    const response = await api.delete(endpoint, { data: body });
    return response.data;
};

export default api;