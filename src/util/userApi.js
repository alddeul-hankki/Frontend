import { post } from './api';

const baseURL = "https://api.version-pulse.store";

// 사용자 생성
export const getOrCreateUser = async (userRequest) => {
    try {
        const data = await post(baseURL + '/api/users', userRequest);
        return data;
    } catch (error) {
        console.error('사용자 생성 실패:', error);
        throw error;
    }
};

export default {
    getOrCreateUser
};