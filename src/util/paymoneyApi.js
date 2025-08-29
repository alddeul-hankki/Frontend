import api from './api';

const baseURL = "http://localhost:8080";

export const inquirePayMoney = async ({ email }) => {
  const { data } = await api.post(`${baseURL}/api/paymoney/inquiry`, {
    email
  });
  return data;
};
 
