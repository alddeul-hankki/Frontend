import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_DDANGYO_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_LOGIN_TOKEN}`,
        'uuid-token': import.meta.env.VITE_UUID_TOKEN
    },
});

// POST 요청만 할 수 있는 유틸리티 함수
export const post = async (endpoint, body) => {
    const response = await api.post(endpoint, body);
    return response.data;
};

export const saveFCMToken = async (token) => {
    try {
      const response = await fetch('/api/fcm/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            fcmToken: token,
            deviceType : 'web',
            timestamp : new Date().toISOString()
         })
      });

      return await response.json();
      
    } catch (error) {
      console.error('FCM 토큰 저장 실패:', error);
    }
  };

  export const deleteFCMToken = async (token) => {
    try {
        const response = await fetch('/api/fcm/token', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fcmToken: token })
        })
        return await response.json();
    } catch (error) {
        console.error('FCM 토큰 삭제 실패:', error);
    }
  }

export default api;