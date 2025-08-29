import React, { useState, useEffect, useRef, useCallback } from 'react';
import WaitingRoomCard from '../WaitingRoomCard/WaitingRoomCard';
import styles from './WaitingRoomList.module.css';
import { getGroupList } from '../../../../util/solsolApi';

const pageSize = 3; // 한 번에 로드할 개수

const WaitingRoomList = () => {
  const [waitingRooms, setWaitingRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);
  const currentItemsRef = useRef(0); 
  const isInitializedRef = useRef(false); 

  // 초기 데이터 로드
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      loadMoreData();
    }
  }, []);

  // 추가 데이터 로드 함수 (가로 스크롤)
  const loadMoreData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const requestBody = {
        campusId: 1,
      };

      const response = await getGroupList(requestBody);
      console.log('API Response:', response);

      if (response && Array.isArray(response)) {
        // 만료된 그룹 제거 (deadlineAt이 현재 시각 이전이면 제외)
        const nowMs = Date.now();
        const filtered = response.filter((room) => {
          if (room.deadlineAt) {
            const d = new Date(room.deadlineAt).getTime();
            return d > nowMs; // 아직 마감 전만 노출
          }
          return true; // deadlineAt 없으면 일단 노출
        });

        const currentPage = Math.floor(currentItemsRef.current / pageSize);
        const start = currentPage * pageSize;
        const end = start + pageSize;
        const newData = filtered.slice(start, end);

        setWaitingRooms(prev => {
          const updated = [...prev, ...newData];
          currentItemsRef.current = updated.length; // ref 업데이트
          return updated;
        });

        if (end >= filtered.length) {
          setHasMore(false);
        }
      } else {
        console.error('Invalid API response format:', response);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(()=>{
    if(!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

    if (scrollLeft + clientWidth >= scrollWidth - 100) {
      loadMoreData();
    }
  }, [loadMoreData]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <div className={styles.waitingRoomList}>
      <h3 className={styles.sectionSubtitle}>너만 땡기면 바로 주문</h3>
      <div className={styles.horizontalScrollContainer} ref={containerRef}>
        <div className={styles.horizontalScrollContent}>
          {waitingRooms.map((room, index) => (
            <div key={room.groupId || index} className={styles.roomCardWrapper}>
              <WaitingRoomCard room={room} />
            </div>
          ))}
          {loading && (
            <div className={styles.loadingIndicator}>
              <div className={styles.spinner}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaitingRoomList;
