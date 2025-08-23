import React, { useState, useEffect, useRef, useCallback } from 'react';
import RestaurantCard from '../RestaurantCard/RestaurantCard';
  import styles from './RestaurantList.module.css';

//더미 데이터
const allData = [
  { id: 1, name: "신한피자 강남점", location: "강남구", reviews: "000", rating: "0.0", targetAmount: "50000원" },
  { id: 2, name: "피자헛 강남점", location: "강남구", reviews: "120", rating: "4.5", targetAmount: "60000원" },
  { id: 3, name: "도미노 강남점", location: "강남구", reviews: "50", rating: "4.0", targetAmount: "55000원" },
  { id: 4, name: "미스터피자 강남점", location: "강남구", reviews: "30", rating: "3.8", targetAmount: "52000원" },
  { id: 5, name: "피자마루 강남점", location: "강남구", reviews: "80", rating: "4.2", targetAmount: "50000원" },
  { id: 6, name: "피자헛 서초점", location: "서초구", reviews: "95", rating: "4.3", targetAmount: "58000원" },
  { id: 7, name: "도미노 서초점", location: "서초구", reviews: "45", rating: "3.9", targetAmount: "54000원" },
  { id: 8, name: "미스터피자 서초점", location: "서초구", reviews: "25", rating: "3.7", targetAmount: "51000원" },
  { id: 9, name: "피자마루 서초점", location: "서초구", reviews: "70", rating: "4.1", targetAmount: "49000원" },
  { id: 10, name: "피자헛 홍대점", location: "마포구", reviews: "110", rating: "4.4", targetAmount: "62000원" },
  { id: 11, name: "도미노 홍대점", location: "마포구", reviews: "55", rating: "4.1", targetAmount: "56000원" },
  { id: 12, name: "미스터피자 홍대점", location: "마포구", reviews: "35", rating: "3.9", targetAmount: "53000원" },
  { id: 13, name: "피자마루 홍대점", location: "마포구", reviews: "85", rating: "4.3", targetAmount: "51000원" },
];
const pageSize = 3;// 한 번에 로드할 개수

const RestaurantList = () => {
  const [restaurantItems, setRestaurantItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);
  const currentItemsRef = useRef(0); // 현재 아이템 수를 추적하기 위한 ref
  const isInitializedRef = useRef(false); // 초기화 여부를 추적하는 ref

  // 초기 로드
  useEffect(() => {
    if (!isInitializedRef.current) {
      console.log("초기 로드 시작");
      isInitializedRef.current = true;
      loadMoreData();
    }
  }, []);

   // 데이터 로드 함수
  const loadMoreData = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    setTimeout(() => {
      const currentPage = Math.floor(currentItemsRef.current / pageSize);
      console.log("현재 페이지:", currentPage, "현재 아이템 수:", currentItemsRef.current);
      const start = currentPage * pageSize;
      const end = start + pageSize;
      console.log("시작 인덱스:", start, "끝 인덱스:", end);
      const newData = allData.slice(start, end);
      console.log("새로 로드할 데이터:", newData);

      setRestaurantItems(prev => {
        const updated = [...prev, ...newData];
        currentItemsRef.current = updated.length; // ref 업데이트
        console.log("업데이트된 아이템 수:", updated.length);
        return updated;
      });
      setLoading(false);

      if (end >= allData.length) {
        setHasMore(false);
      }
    }, 1000);
  }, [loading, hasMore, pageSize]);

  // 스크롤 이벤트
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
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
    <div className={styles.restaurantList} ref={containerRef}>
      {/* 메인 음식 목록 (세로 스크롤) */}
      <div className={styles.restaurantSection}>
        <h3 className={styles.sectionSubtitle}>주문 가능한 음식</h3>
        <div className={styles.restaurantGrid}>
          {restaurantItems.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
        
        {/* 로딩 인디케이터 */}
        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>음식을 불러오는 중...</p>
          </div>
        )}
        
        {/* 더 이상 데이터가 없을 때 */}
        {!hasMore && restaurantItems.length > 0 && (
          <div className={styles.noMoreData}>
            <p>모든 음식을 불러왔습니다!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
