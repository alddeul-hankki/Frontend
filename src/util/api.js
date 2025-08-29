import axios from 'axios';

// API 서버별 설정
const API_CONFIGS = {
    ddangyo: {
        baseURL: import.meta.env.VITE_API_DDANGYO_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_LOGIN_TOKEN}`
        }
    },

    solsolhanHankki: {
        baseURL: import.meta.env.VITE_API_HANKKI_URL || '',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_LOGIN_TOKEN}`
        }
    }
};

// API 클라이언트 생성 함수
const createApiClient = (configName) => {
    const config = API_CONFIGS[configName];
    if (!config) {
        throw new Error(`Unknown API config: ${configName}`);
    }

    return axios.create({
        ...config,
        timeout: 10000,
        validateStatus: (status) => status < 500
    });
};

// 기본 API 클라이언트 설정 (기존 함수 호출 유지용)
const defaultApi = createApiClient('ddangyo');

// API 클라이언트 export
export const ddangyoApi = defaultApi;
export const solsolhanHankkiApi = createApiClient('solsolhanHankki');

// 기존 함수 호출 방식 그대로 유지
export const get = async (endpoint, params = {}, apiClient = defaultApi) => {
    const response = await apiClient.get(endpoint, { params });
    return response.data;
};

export const post = async (endpoint, body, apiClient = defaultApi) => {
    const response = await apiClient.post(endpoint, body);
    return response.data;
};

export const put = async (endpoint, body, apiClient = defaultApi) => {
    const response = await apiClient.put(endpoint, body);
    return response.data;
};

export const patch = async (endpoint, body, apiClient = defaultApi) => {
    const response = await apiClient.patch(endpoint, body);
    return response.data;
};

export const del = async (endpoint, body = {}, apiClient = defaultApi) => {
    const response = await apiClient.delete(endpoint, { data: body });
    return response.data;
};

export default {
  ddangyoApi,
  solsolhanHankkiApi,
  get,
  post,
  put,
  patch,
  del,
};
