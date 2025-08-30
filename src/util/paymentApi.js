import { post } from './api';

const baseURL = "https://api.version-pulse.store";

// 결제 요청
export const postPayment = async (token, userId) => {
    try {
        const data = await post(baseURL + '/api/payments/token', { token, userId });
        return data;
    } catch (error) {
        console.error('결제 요청 실패:', error);
        throw error;
    }
};


export const withdrawPayment = async (paymentRequest) => {
    try {
        const data = await post(baseURL + '/api/payments/withdraw', paymentRequest);
        return data;
    } catch (error) {
        console.error('결제 요청 실패:', error);
        throw error;
    }
};

export default {
    postPayment
};