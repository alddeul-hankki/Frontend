import { useState, useCallback, useEffect } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../config/firebase';
import { saveFCMToken, deleteFCMToken } from '../util/notificationApi';

export const useFCM = () => {
    const [token, setToken] = useState(null);
    const [notification, setNotification] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [permission, setPermission] = useState('default');

    // VAPID 키 가져오기
    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;

    // 권한 요청 및 토큰 가져오기
    const requestPermission = useCallback(async () => {
        try {
            setIsLoading(true);

            // 브라우저 지원 확인
            if (!('Notification' in window)) {
                console.log('이 브라우저는 알림을 지원하지 않습니다');
                setPermission('unsupported');
                return;
            }

            // 서비스 워커 지원 확인
            if (!('serviceWorker' in navigator)) {
                console.log('이 브라우저는 Service Worker를 지원하지 않습니다');
                setPermission('unsupported');
                return;
            }

            // VAPID 키 확인
            if (!vapidKey) {
                console.error('VAPID 키가 설정되지 않았습니다');
                setPermission('error');
                return;
            }

            console.log('VAPID 키 확인됨 v2');

            // 권한 요청
            const permissionResult = await Notification.requestPermission();
            setPermission(permissionResult);

            if (permissionResult === 'granted') {
                console.log('알림 권한 허용됨');

                try {
                    // 기존 Firebase SW 정리 (중복 방지)
                    const existingRegistrations = await navigator.serviceWorker.getRegistrations();
                    for (const reg of existingRegistrations) {
                        if (reg.scope.includes('firebase-messaging-sw')) {
                            await reg.unregister();
                            console.log('기존 Firebase SW 해제:', reg.scope);
                        }
                    }

                    // Firebase Service Worker 등록
                    let registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
                    await navigator.serviceWorker.ready;
                    
                    // FCM 토큰 생성
                    const currentToken = await getToken(messaging, {
                        vapidKey: vapidKey,
                        serviceWorkerRegistration: registration
                    });

                    if (currentToken) {
                        setToken(currentToken);
                        console.log('FCM 토큰 생성 성공');

                        try {
                            await saveFCMToken(currentToken);
                            console.log('FCM 토큰 저장 성공');
                        } catch (saveError) {
                            console.error('FCM 토큰 저장 실패:', saveError);
                        }
                    } else {
                        console.log('FCM 토큰을 가져올 수 없습니다');
                    }
                } catch (innerError) {
                    console.error('Service Worker 또는 토큰 생성 에러:', innerError);
                    throw innerError; // 상위 catch로 전달
                }
            } else {
                console.log('알림 권한이 거부되었습니다');
            }

        } catch (error) {
            console.error('FCM 권한 요청 실패:', error);
            setPermission('denied');
        } finally {
            setIsLoading(false);
        }
    }, [vapidKey]);

    // 포그라운드 메시지 처리
    useEffect(() => {
        const unsubscribe = onMessage(messaging, (payload) => {
            setNotification(payload);
        });

        return () => unsubscribe();
    }, []);

    // 권한이 이미 허용된 경우 자동으로 토큰 확보
    useEffect(() => {
        let mounted = true;
        (async () => {
            if (Notification.permission !== 'granted' || token) return;

            // Firebase SW 보장
            const regs = await navigator.serviceWorker.getRegistrations();
            let reg = regs.find(r => r.active?.scriptURL?.includes('firebase-messaging-sw.js'));
            if (!reg) {
                reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
            }
            await navigator.serviceWorker.ready;

            const t = await getToken(messaging, { vapidKey, serviceWorkerRegistration: reg });
            if (mounted && t) {
                setToken(t);
                try { await saveFCMToken(t); } catch {}
            }
        })();
        return () => { mounted = false; };
    }, [token, vapidKey]);

    // 로그아웃 시 토큰 삭제
    const logout = useCallback(async () => {
        if (token) {
            try {
                await deleteFCMToken(token);
                setToken(null);
                console.log('FCM 토큰 삭제 완료');
            } catch (error) {
                console.error('FCM 토큰 삭제 실패:', error);
            }
        }
    }, [token]);

    return {
        token,
        notification,
        isLoading,
        permission,
        requestPermission,
        logout,
    }
}