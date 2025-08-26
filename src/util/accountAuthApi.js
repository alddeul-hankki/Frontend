import api from './api';

const baseURL = "http://localhost:8080";

export const verifyAccount = async (email, accountId) => {
  try {
    const response = await api.post(baseURL + '/api/accounts/verification', {
      email,
      accountId
    });
    return response.data; // ApiResponse<Void> 반환
  } catch (error) {
    console.error('계좌 검증 실패:', error);
    throw error;
  }
};

export default {
  verifyAccount,
};