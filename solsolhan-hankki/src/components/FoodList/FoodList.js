import React, { useState, useEffect, useRef, useCallback } from 'react';
import FoodCard from '../FoodCard/FoodCard';
import WaitingRoomList from '../WaitingRoomList/WaitingRoomList';
import './FoodList.css';

//더미 데이터
const allData = [
  { id: 1, name: "신한피자 강남점", location: "강남구", reviews: "000", rating: "0.0", targetAmount: "50000원" },
  { id: 2, name: "피자헛 강남점", location: "강남구", reviews: "120", rating: "4.5", targetAmount: "60000원" },
  { id: 3, name: "도미노 강남점", location: "강남구", reviews: "50", rating: "4.0", targetAmount: "55000원" },
  { id: 4, name: "미스터피자 강남점", location: "강남구", reviews: "30", rating: "3.8", targetAmount: "52000원" },
  { id: 5, name: "피자마루 강남점", location: "강남구", reviews: "80", rating: "4.2", targetAmount: "50000원" },
  { id: 6, name: "피자헛 강남점", location: "강남구", reviews: "120", rating: "4.5", targetAmount: "60000원" },
  { id: 7, name: "도미노 강남점", location: "강남구", reviews: "50", rating: "4.0", targetAmount: "55000원" },
  { id: 8, name: "미스터피자 강남점", location: "강남구", reviews: "30", rating: "3.8", targetAmount: "52000원" },
  { id: 9, name: "피자마루 강남점", location: "강남구", reviews: "80", rating: "4.2", targetAmount: "50000원" },
  { id: 10, name: "피자헛 강남점", location: "강남구", reviews: "120", rating: "4.5", targetAmount: "60000원" },
  { id: 11, name: "도미노 강남점", location: "강남구", reviews: "50", rating: "4.0", targetAmount: "55000원" },
  { id: 12, name: "미스터피자 강남점", location: "강남구", reviews: "30", rating: "3.8", targetAmount: "52000원" },
  { id: 13, name: "피자마루 강남점", location: "강남구", reviews: "80", rating: "4.2", targetAmount: "50000원" },
];

const FoodList = () => {
  const pageSize = 3; // 한 번에 로드할 개수
  const [foodItems, setFoodItems] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);

    // 초기 로드
  useEffect(() => {
    loadMoreData();
  }, []);

   // 데이터 로드 함수
  const loadMoreData = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    setTimeout(() => {
      const start = page * pageSize;
      const end = start + pageSize;
      const newData = allData.slice(start, end);

      setFoodItems(prev => [...prev, ...newData]);
      setPage(prev => prev + 1);
      setLoading(false);

      if (end >= allData.length) {
        setHasMore(false);
      }
    }, 500);
  }, [loading, hasMore, page]);

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
    <div className="food-list" ref={containerRef}>
      {/* 대기방 리스트 (가로 스크롤) */}
      <WaitingRoomList />
      
      {/* 메인 음식 목록 (세로 스크롤) */}
      <div className="food-section">
        <h3 className="section-subtitle">주문 가능한 음식</h3>
        <div className="food-grid">
          {foodItems.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
        
        {/* 로딩 인디케이터 */}
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>음식을 불러오는 중...</p>
          </div>
        )}
        
        {/* 더 이상 데이터가 없을 때 */}
        {!hasMore && foodItems.length > 0 && (
          <div className="no-more-data">
            <p>모든 음식을 불러왔습니다!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodList;
