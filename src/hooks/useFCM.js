import { useState, useCallback, useEffect, useRef } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../config/firebase';
import { saveFCMToken, deleteFCMToken } from '../util/notificationApi';

export const useFCM = () => {
    const [token, setToken] = useState(null);
    const [notification, setNotification] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [permission, setPermission] = useState('default');

    const isEnsuringRef = useRef(false);            // 토큰 확보/저장 중인지
    const savedTokensRef = useRef(new Set());       // 이미 저장된 토큰 모음
    const didInitRef = useRef(false);               // 자동/수동 초기화 1회만
    const vapidKeyRef = useRef(import.meta.env.VITE_FIREBASE_VAPID_KEY);

    // 세션에 저장된 토큰 기록 복원 (새로고침/재접속 시 중복 저장 방지)
    useEffect(() => {
        try {
            const saved = sessionStorage.getItem('savedFcmTokens');
            if (saved) {
                const arr = JSON.parse(saved);
                if (Array.isArray(arr)) {
                    savedTokensRef.current = new Set(arr);
                }
            }
        } catch {}
    }, []);

    const ensureTokenSaved = useCallback(async () => {
        if (isEnsuringRef.current) return;
        isEnsuringRef.current = true;
        try {
            if (!('serviceWorker' in navigator)) {
                console.log('이 브라우저는 Service Worker를 지원하지 않습니다');
                return;
            }
            if (!vapidKeyRef.current) {
                console.error('VAPID 키가 설정되지 않았습니다');
                return;
            }

            const regs = await navigator.serviceWorker.getRegistrations();
            let reg = regs.find(r => r.active?.scriptURL?.includes('firebase-messaging-sw.js'));
            if (!reg) {
                reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
            }
            await navigator.serviceWorker.ready;

            const currentToken = await getToken(messaging, {
                vapidKey: vapidKeyRef.current,
                serviceWorkerRegistration: reg
            });
            if (!currentToken) {
                console.log('FCM 토큰을 가져올 수 없습니다');
                return;
            }

            if (savedTokensRef.current.has(currentToken)) {
                setToken(currentToken);
                return;
            }

            setToken(currentToken);
            await saveFCMToken(currentToken);
            savedTokensRef.current.add(currentToken);
            try { sessionStorage.setItem('savedFcmTokens', JSON.stringify([...savedTokensRef.current])); } catch {}
        } catch (e) {
            console.error('토큰 확보/저장 에러:', e);
        } finally {
            isEnsuringRef.current = false;
        }
    }, []);

    const requestPermission = useCallback(async () => {
        try {
            setIsLoading(true);

            if (!('Notification' in window)) {
                console.log('이 브라우저는 알림을 지원하지 않습니다');
                setPermission('unsupported');
                return;
            }

            // 이미 허용 + 초기화 완료면 즉시 종료 (모바일 반복 방지)
            if (Notification.permission === 'granted' && didInitRef.current) {
                return;
            }

            // 이미 허용인데 아직 초기화 전이면 바로 초기화
            if (Notification.permission === 'granted' && !didInitRef.current) {
                didInitRef.current = true;
                await ensureTokenSaved();
                setPermission('granted');
                return;
            }

            const permissionResult = await Notification.requestPermission();
            setPermission(permissionResult);

            if (permissionResult === 'granted') {
                if (!didInitRef.current) didInitRef.current = true;
                await ensureTokenSaved();
            } else {
                console.log('알림 권한이 거부되었습니다');
            }
        } catch (error) {
            console.error('FCM 권한 요청 실패:', error);
            setPermission('denied');
        } finally {
            setIsLoading(false);
        }
    }, [ensureTokenSaved]);

    useEffect(() => {
        const unsubscribe = onMessage(messaging, (payload) => {
            setNotification(payload);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (didInitRef.current) return;
        if (Notification.permission === 'granted') {
            didInitRef.current = true;
            ensureTokenSaved();
        }
        // 의도적으로 1회만 실행
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = useCallback(async () => {
        if (token) {
            try {
                await deleteFCMToken(token);
                savedTokensRef.current.delete(token);
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