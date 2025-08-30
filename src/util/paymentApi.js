import { post } from './api';

<<<<<<< HEAD
const baseURL = import.meta.env.VITE_API_BASE_URL;
=======
const baseURL = "https://api.version-pulse.store";
>>>>>>> df5dbfff666e8687faa7471668db6a4a3d4ae129

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