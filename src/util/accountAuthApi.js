import api from './api';

const baseURL = "https://api.version-pulse.store";

export const verifyAccount = async (email, accountId) => {
  try {
    const response = await api.post(baseURL + '/api/accounts/verification', {
      email,
      accountId
    });
    return response;
  } catch (error) {
    console.error('계좌 검증 실패:', error);
    throw error;
  }
};

export const confirmAccount = async (email, accountId, code) => {
  try {
    const response = await api.post(baseURL + '/api/accounts/verification/confirm', {
      email,
      accountId,
      code
    });
    return response;
  } catch (error) {
    console.error('계좌 검증 실패:', error);
    throw error;
  }
}

export default {
  verifyAccount,
  confirmAccount,
};