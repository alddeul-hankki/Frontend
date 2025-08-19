import React, { useState, useEffect, useRef, useCallback } from 'react';
import WaitingRoomCard from '../WaitingRoomCard/WaitingRoomCard';
import './WaitingRoomList.css';

const allWaitingRooms = [
  { id: 1, name: "신한치킨 강남점", deliveryAddress: "도서관 앞", orderDeadline: "11:30", eta: "12:10", amountToTarget: "5,000" },
  { id: 2, name: "교촌치킨 역삼점", deliveryAddress: "학생회관 입구", orderDeadline: "12:00", eta: "12:40", amountToTarget: "8,000" },
  { id: 3, name: "BHC 선릉점", deliveryAddress: "도서관 앞", orderDeadline: "11:45", eta: "12:25", amountToTarget: "3,500" },
  { id: 4, name: "네네치킨 삼성점", deliveryAddress: "도서관 앞", orderDeadline: "12:15", eta: "12:55", amountToTarget: "6,000" },
  { id: 5, name: "굽네치킨 강남역점", deliveryAddress: "도서관 앞", orderDeadline: "11:50", eta: "12:30", amountToTarget: "4,500" },
  { id: 6, name: "호식이두마리치킨 신논현점", deliveryAddress: "도서관 앞", orderDeadline: "12:05", eta: "12:45", amountToTarget: "7,500" },
  { id: 7, name: "BBQ 청담점", deliveryAddress: "도서관 앞", orderDeadline: "12:20", eta: "13:00", amountToTarget: "5,500" },
  { id: 8, name: "페리카나 압구정점", deliveryAddress: "도서관 앞", orderDeadline: "11:55", eta: "12:35", amountToTarget: "6,500" },
  { id: 9, name: "멕시카나 논현점", deliveryAddress: "도서관 앞", orderDeadline: "12:10", eta: "12:50", amountToTarget: "2,500" },
  { id: 10, name: "처갓집 양재점", deliveryAddress: "도서관 앞", orderDeadline: "12:30", eta: "13:10", amountToTarget: "9,000" },
];

const pageSize = 3;

const WaitingRoomList = () => {
  const [waitingRooms, setWaitingRooms] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);

  // 초기 데이터 로드
  useEffect(() => {
    loadMoreData();
  }, []);

  // 추가 데이터 로드 함수 (가로 스크롤)
  const loadMoreData = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    // 실제 API 호출을 시뮬레이션
    setTimeout(() => {
      const start = page * pageSize;
      const end = start + pageSize;
      const newData = allWaitingRooms.slice(start, end);

      setWaitingRooms(prev => [...prev, ...newData]);
      setPage(prev => prev + 1);
      setLoading(false);

      if(end >= allWaitingRooms.length) {
        setHasMore(false);
      }
    }, 500);
  }, [loading, hasMore, page, pageSize]);

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
    <div className="waiting-room-list">
      <h3 className="section-subtitle">너만 땡기면 바로 주문</h3>
      <div className="horizontal-scroll-container" ref={containerRef}>
        <div className="horizontal-scroll-content">
          {waitingRooms.map((room) => (
            <div key={room.id} className="room-card-wrapper">
              <WaitingRoomCard room={room} />
            </div>
          ))}
          {loading && (
            <div className="loading-indicator">
              <div className="spinner"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaitingRoomList;
