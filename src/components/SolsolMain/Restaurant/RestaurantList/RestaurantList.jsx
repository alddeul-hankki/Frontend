import React, { useEffect, useRef } from 'react';
import RestaurantCard from '../RestaurantCard/RestaurantCard';
import styles from './RestaurantList.module.css';
import { useRestaurants } from '../../../../hooks/useRestaurants';

const RestaurantList = ({ filters }) => {
  const { items, loading, hasMore, loadMore, page } = useRestaurants(filters);
  const containerRef = useRef(null);
  const sentinelRef = useRef(null);

  // IntersectionObserver로 무한스크롤 트리거 (로딩 중에는 비활성화)
  useEffect(() => {
    const node = sentinelRef.current;
    const rootNode = containerRef.current || null;
    console.log('[ObserverSetup] loading:', loading, 'hasMore:', hasMore, 'node:', !!node, 'root:', !!rootNode, 'page:', page);
    if (!node || loading || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      console.log('[ObserverEntry] isIntersecting=', first.isIntersecting, 'ratio=', first.intersectionRatio);
      if (first.isIntersecting) {
        observer.unobserve(first.target);
        console.log('[ObserverTrigger] loadMore 호출');
        loadMore();
      }
    }, {
      root: rootNode,
      rootMargin: '0px 0px 100px 0px',
      threshold: 0.1,
    });

    observer.observe(node);
    console.log('[ObserverObserve] 센티넬 관찰 시작');
    return () => {
      console.log('[ObserverCleanup] 옵저버 해제');
      observer.disconnect();
    };
  }, [loading, hasMore, loadMore, page]);

  useEffect(() => {
    console.log('[Render] items=', items.length, 'loading=', loading, 'hasMore=', hasMore, 'page=', page);
  }, [items.length, loading, hasMore, page]);

  return (
    <div className={styles.restaurantList} ref={containerRef}>
      <div className={styles.restaurantSection}>
        <h3 className={styles.sectionSubtitle}>주문 가능한 음식</h3>
        <div className={styles.restaurantGrid}>
          {items.map((restaurant) => (
            <RestaurantCard key={restaurant.id ?? restaurant.patstoNo ?? restaurant.patsto_no} restaurant={restaurant} />
          ))}
        </div>

        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>음식을 불러오는 중...</p>
          </div>
        )}

        {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
      </div>
    </div>
  );
};

export default RestaurantList;
