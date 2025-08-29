import api from './api';

const baseURL = "http://localhost:8080";

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

