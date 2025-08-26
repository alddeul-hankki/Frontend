import { useState, useCallback, useEffect } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../config/firebase';
import { saveFCMToken, deleteFCMToken } from '../util/api';

export const useFCM = () => {
    const [token, setToken] = useState(null);
    const [notification, setNotification] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [permission, setPermission] = useState('default');

    //VAPID 키 가져오기
    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;

    //권한 요청 및 토큰 가져오기
    const requestPermission = useCallback(async () => {
        try {
            setIsLoading(true);

            //브라우저 지원 확인
            if(!('Notification' in window)){
                console.log('이 브라우저는 알림을 지원하지 않습니다');
                setPermission('unsupported');
                return;
            }

            //권한 요청
            const permissionResult = await Notification.requestPermission();
            setPermission(permissionResult);

            if(permissionResult === 'granted'){
                const currentToken = await getToken(messaging, {
                    vapidKey: vapidKey
                });
                setToken(currentToken);
                
                if(currentToken) {
                    try{
                        await saveFCMToken(currentToken);
                    }catch(error){
                        console.error('FCM 토큰 저장 실패:', error);
                    }
                }
            }

        }catch(error){
            console.error('FCM 권한 요청 실패:', error);
            setPermission('denied');
        }finally{
            setIsLoading(false);
        }
    },[vapidKey]);

    //토큰 갱신 처리
    const refreshToken = useCallback(async () => {
        try{
            const newToken = await getToken(messaging, {
                vapidKey: vapidKey
            });
            setToken(newToken);

            if(newToken && newToken !== token){
                try{
                    await saveFCMToken(newToken);
                }catch(error){
                    console.error('FCM 토큰 저장 실패:', error);
                }
            }
        }catch(error){
            console.error('FCM 토큰 갱신 실패:', error);
        }
    },[vapidKey, token]);

    //포그라운드 메시지 처리
    useEffect(() => {
        const unsubscribe = onMessage(messaging, (payload) => {
            setNotification(payload);

            if(Notification.permission === 'granted'){
                const notificationTitle = payload.notification?.title || '새로운 알림';
                const notificationOptions = {
                    body : payload.notification?.body || '새로운 알림이 도착했습니다',
                    icon : '/logo192.png',
                    badge : '/logo192.png',
                    data : payload.data,
                    requireInteraction : true,
                };

                new Notification(notificationTitle, notificationOptions);
            }
        });

        return () => unsubscribe();
    },[]);

    // //토큰 갱신 이벤트 리스너
    // useEffect(() => {
    //     const unsubscribe = onTokenRefresh(messaging, async () => {
    //         await refreshToken();
    //     });

    //     return () => unsubscribe();
    // },[refreshToken]);

    //로그 아웃 시 토큰 삭제
    const logout = useCallback(async () => {
        if(token){
            try{
                await deleteFCMToken(token);
                setToken(null);
            }catch(error){
                console.error('FCM 토큰 삭제 실패:', error);
            }
        }
    },[token]);

    return {
        token,
        notification,
        isLoading,
        permission,
        requestPermission,
        refreshToken,
        logout,
    }
}