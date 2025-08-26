import api from './api';

const baseURL = "http://localhost:8080";

export const getAccounts = async (email) => {
  try {
    const response = await api.get(baseURL + '/api/accounts', {
      params: { email }
    });
    return response.data;
  } catch (error) {
    console.error('계좌 조회 실패:', error);
    throw error;
  }
};

export const createAccount = async (email) => {
  try {
    const response = await api.post(baseURL + '/api/accounts', {email : email});
    return response.data;
  } catch (error) {
    console.error('계좌 조회 실패:', error);
    throw error;
  }
};

export default {
  getAccounts,
  createAccount
};