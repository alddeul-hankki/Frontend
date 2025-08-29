import { solsolhanHankkiApi } from './api.js';

const getCurrentUserId = () => {
    return parseInt(localStorage.getItem('userId') || '1');
};

// 디바이스 타입 감지 함수
const getDeviceType = () => {
    const userAgent = navigator.userAgent;
    
    // iOS 감지 
    if (/iPad|iPhone|iPod/.test(userAgent) || 
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
        return 'IOS';  
    }
    
    // Android 감지
    if (/Android/.test(userAgent)) {
        return 'ANDROID'; 
    }
    
    return 'WEB';
};

export const saveFCMToken = async (token) => {
    try {
        const userId = getCurrentUserId();
        const deviceType = getDeviceType();
        const response = await solsolhanHankkiApi.post('/fcm/token', {
            fcmToken: token,
            deviceType: deviceType,
            timestamp: new Date().toISOString(),
            userId: userId
        });
        return response.data;
    } catch (error) {
        console.error('FCM 토큰 저장 실패:', error);
        throw error;
    }
};

export const deleteFCMToken = async (token) => {
    try {
        const response = await solsolhanHankkiApi.delete('/fcm/token', {
            data: { fcmToken: token }
        });
        return response.data;
    } catch (error) {
        console.error('FCM 토큰 삭제 실패:', error);
        throw error;
    }
};