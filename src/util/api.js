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
    solsolhanhankki: {
        baseURL: import.meta.env.VITE_API_SOLSOLHANHANKKI_URL,
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
        // 공통 에러 처리
        validateStatus: (status) => status < 500
    });
};

// API 클라이언트들 export
export const ddangyoApi = createApiClient('ddangyo');
export const solsolhanhankkiApi = createApiClient('solsolhanhankki');