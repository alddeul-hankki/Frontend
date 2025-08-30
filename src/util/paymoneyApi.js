import api from './api';

<<<<<<< HEAD
const baseURL = import.meta.env.VITE_API_BASE_URL;
=======
const baseURL = "https://api.version-pulse.store";
>>>>>>> df5dbfff666e8687faa7471668db6a4a3d4ae129

export const createPayMoney = async ({ email }) => {
  const { data } = await api.post(`${baseURL}/api/paymoney/create`, {
    email,
  });
  return data;
};

export const getLedgerHistory = async ({ email }) => {
  const { data } = await api.post(`${baseURL}/api/paymoney/getLedgerHistory`, {
    email,
  });
  return data;
};

export const inquirePayMoney = async ({ email }) => {
  const { data } = await api.post(`${baseURL}/api/paymoney/inquiry`, {
    email,
  });
  return data;
};

export const topupPayMoney = async ({
  email,
  accountNo,
  transactionBalance,
  transactionSummary,
}) => {
  const { data } = await api.post(`${baseURL}/api/paymoney/topup`, {
    email,
    transactionBalance,
    transactionSummary,
  });
  return data;
};

export const refundPayMoney = async ({
  email,
  accountNo,
  transactionBalance,
  transactionSummary,
}) => {
  const { data } = await api.post(`${baseURL}/api/paymoney/refund`, {
    email,
    transactionBalance,
    transactionSummary,
  });
  return data;
};
