import { useState, useEffect, useCallback, useRef } from 'react';
import { getRestaurants } from '../util/ddangApi';

const pageSize = 30;

export const useRestaurants = (filters) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const seenIds = useRef(new Set());

  // 필터 변경 시 초기화
  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    seenIds.current = new Set();
  }, [filters]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const newData = await getRestaurants({
        ...filters,
        page_no: page,
        page_size: pageSize,
        map_lngt: 127.1126139,
        map_latt: 37.2283608,
      });

      if (Array.isArray(newData) && newData.length > 0) {
        const uniqueData = newData.filter((item) => {
          const id = item?.id ?? item?.patstoNo ?? item?.patsto_no;
          return id && !seenIds.current.has(id);
        });

        uniqueData.forEach((item) => {
          const id = item?.id ?? item?.patstoNo ?? item?.patsto_no;
          if (id) seenIds.current.add(id);
        });

        if (uniqueData.length > 0) {
          setItems((prev) => [...prev, ...uniqueData]);
          setPage((prev) => prev + 1);
        } else {
          // 새로 추가된 항목이 없다면 더 이상 호출하지 않음
          setHasMore(false);
        }

        if (newData.length < pageSize) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('데이터 로드 실패:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, filters, loading, hasMore]);

  // 첫 로드
  useEffect(() => {
    if (page === 1) {
      loadMore();
    }
  }, [filters, page, loadMore]);

  return { items, loading, hasMore, loadMore, page };
};