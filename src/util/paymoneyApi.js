import api from './api';

const baseURL = import.meta.env.VITE_API_URL;

export const inquirePayMoney = async ({ email }) => {
  const { data } = await api.post(`${baseURL}/api/paymoney/inquiry`, {
    email
  });
  return data;
};
 
export const topupPayMoney = async ({ email, accountNo, transactionBalance, transactionSummary }) => {
  const { data } = await api.post(`${baseURL}/api/paymoney/topup`, {
    email,
    transactionBalance,
    transactionSummary,
  });
  return data;
};

export const refundPayMoney = async ({ email, accountNo, transactionBalance, transactionSummary }) => {
  const { data } = await api.post(`${baseURL}/api/paymoney/refund`, {
    email,
    transactionBalance,
    transactionSummary,
  });
  return data;
};

