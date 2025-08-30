import api from './api';

<<<<<<< HEAD
const baseURL = import.meta.env.VITE_API_BASE_URL;
=======
const baseURL = "https://api.version-pulse.store";
>>>>>>> df5dbfff666e8687faa7471668db6a4a3d4ae129

export const getAccounts = async (email) => {
  try {
    const response = await api.get(baseURL + '/api/accounts', { email });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('계좌 조회 실패:', error);
    throw error;
  }
};

export const createAccount = async (email) => {
  try {
    const response = await api.post(baseURL + '/api/accounts', {email : email});
    return response;
  } catch (error) {
    console.error('계좌 조회 실패:', error);
    throw error;
  }
};

export const getAccountTransactions = async (transactionRequest) => {
  try {
    const response = await api.post(baseURL + '/api/accounts/transactions', transactionRequest);
    return response;
  } catch (error) {
    console.error('거래내역 조회 실패:', error);
    throw error;
  }
};

export default {
  getAccounts,
  createAccount
};