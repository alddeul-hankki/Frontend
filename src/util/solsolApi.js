import { solsolhanHankkiApi } from './api';

const getGroupList = async (requestBody) => {
    const response = await solsolhanHankkiApi.post('/groups', requestBody);
    return response.data;
};

const orderPreview = async (requestBody) => {
    const response = await solsolhanHankkiApi.post('/orders/preview', requestBody);
    return response.data;
};

const getPickupZones = async (campusId) => {
    console.log('🔄 getPickupZones API 호출:', `/campus/${campusId}/pickup-zones`);
    const response = await solsolhanHankkiApi.get(`/campus/${campusId}/pickup-zones`);
    console.log('✅ getPickupZones API 응답:', response.data);
    return response.data;
};

const createOrder = async (orderRequest) => {
    console.log('🔄 createOrder API 호출:', orderRequest);
    const response = await solsolhanHankkiApi.post('/orders', orderRequest);
    console.log('✅ createOrder API 응답:', response.data);
    return response.data;
};

// 결제 결과 조회 (payment_token 기반)
const getOrderResult = async (paymentToken) => {
    const config = paymentToken ? { params: { payment_token: paymentToken } } : undefined;
    const response = await solsolhanHankkiApi.get(`/orders/result`, config);
    return response.data;
};

export { getGroupList, orderPreview, getPickupZones, createOrder, getOrderResult };