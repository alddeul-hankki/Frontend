import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Solsolpay.module.css';
import { getOrderResult } from '../../util/solsolApi';
import HeaderSection from '../../components/SolsolPay/HeaderSection';

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

// ISO(Z) → HH:MM (로컬)
const toHHMM = (iso) => {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  } catch {
    return '';
  }
};

const OrderComplete = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = query.get('payment_token');
    const run = async () => {
      try {
        const res = await getOrderResult(token);
        setData(res);
      } catch (e) {
        setError('주문 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [query]);

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div style={{ padding: 20 }}>로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div style={{ padding: 20 }}>{error || '주문 정보를 찾을 수 없습니다.'}</div>
        </div>
      </div>
    );
  }

  const { storeName, paymentAmount, pickupZoneName, deadlineAt, pickupAt } = data;
  const orderHHMM = toHHMM(deadlineAt);
  const pickupHHMM = toHHMM(pickupAt);

  // 예쁜 기본 폰트 세트 (시스템 폰트 + Pretendard 호환)
  const prettyFont = 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif';

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.card}
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: prettyFont }}
      >
        <HeaderSection storeName={storeName || '주문 완료'} />

        {/* 큰 타이틀 */}
        <section className={styles.section}>
          <h2 style={{ margin: '16px 0 24px 0', fontSize: 24, fontWeight: 700 }}>
            {storeName || '가게'}에 예약 주문을 완료했어요!
          </h2>
          <div style={{ fontSize: 17, color: '#666', marginBottom: 20 }}>늦지 않게 도착해주세요 😊</div>
        </section>

        {/* 심플한 정보 라인들 (가로줄 제거, 간격 확대) */}
        <section className={styles.section} style={{ marginTop: 6 }}>
          <div style={{ display: 'grid', gap: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ fontSize: 17, color: '#666' }}>픽업 장소</span>
              <span style={{ fontSize: 19, fontWeight: 600 }}>{pickupZoneName || '-'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ fontSize: 17, color: '#666' }}>예약 주문 시간</span>
              <span style={{ fontSize: 19, fontWeight: 600 }}>{orderHHMM || '-'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ fontSize: 17, color: '#666' }}>도착 보장 시간</span>
              <span style={{ fontSize: 19, fontWeight: 600 }}>{pickupHHMM || '-'}</span>
            </div>
          </div>
        </section>

        {/* 여백으로 버튼을 바닥에 고정 */}
        <div style={{ flex: 1 }} />

        {/* 총 결제 금액 강조 (버튼 위) */}
        <section className={styles.section} style={{ marginTop: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 18, fontWeight: 800 }}>총 결제 금액</span>
            <span style={{ fontSize: 24, fontWeight: 900 }}>{(paymentAmount || 0).toLocaleString()}원</span>
          </div>
        </section>

        <footer className={styles.footer} style={{ marginTop: 'auto' }}>
          <button className={styles.cta} onClick={() => navigate('/')}>헤이영으로 돌아가기</button>
        </footer>
      </div>
    </div>
  );
};

export default OrderComplete;