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
};

const solsolhanHankkiApi = axios.create({
  baseURL: import.meta.env.VITE_API_HANKKI_URL || '',
  headers: {
      'Content-Type': 'application/json',
  },
});

// 디버그 인터셉터 및 환경 로그 제거 (운영 기본 설정)

// POST 요청만 할 수 있는 유틸리티 함수
export const post = async (endpoint, body) => {
    const response = await api.post(endpoint, body);
    return response.data;
};

export { solsolhanHankkiApi };
