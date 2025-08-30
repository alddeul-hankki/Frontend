import api from './api';

<<<<<<< HEAD
const baseURL = import.meta.env.VITE_API_BASE_URL;
=======
const baseURL = "https://api.version-pulse.store";
>>>>>>> df5dbfff666e8687faa7471668db6a4a3d4ae129

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