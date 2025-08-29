import { useEffect, useState } from 'react';

export const useKakaoLoader = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    console.log('[KAKAO] useKakaoLoader: effect start');
    if (window.kakao && window.kakao.maps) {
      console.log('[KAKAO] window.kakao.maps already present');
      setLoaded(true);
      return;
    }
    const appkey = import.meta.env.VITE_KAKAO_MAP_API;
    if (!appkey) {
      console.error('Kakao Map API key is missing: VITE_KAKAO_MAP_API');
      return;
    }
    let script = document.getElementById('kakao-map-sdk');
    if (!script) {
      console.log('[KAKAO] injecting sdk script');
      script = document.createElement('script');
      script.id = 'kakao-map-sdk';
      // services 라이브러리 포함 (지오코더 등 확장 기능 대비)
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appkey}&libraries=services&autoload=false`;
      script.async = true;
      script.onload = () => {
        try {
          console.log('[KAKAO] sdk onload fired');
          window.kakao.maps.load(() => {
            console.log('[KAKAO] kakao.maps.load callback fired');
            setLoaded(true);
          });
        } catch (e) {
          console.error('Kakao maps load error:', e);
        }
      };
      document.head.appendChild(script);
    } else if (window.kakao && window.kakao.maps) {
      console.log('[KAKAO] sdk script already exists and maps present');
      setLoaded(true);
    }
    return () => {
      console.log('[KAKAO] useKakaoLoader: effect cleanup');
    };
  }, []);
  useEffect(() => {
    console.log('[KAKAO] useKakaoLoader: loaded state changed ->', loaded);
  }, [loaded]);
  return loaded;
};


