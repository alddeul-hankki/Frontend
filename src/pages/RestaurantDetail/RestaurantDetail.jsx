import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRestaurantDetail, getRestaurantInfo } from '../../util/ddangApi';
import styles from './RestaurantDetail.module.css';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartXRef = useRef(null);
  const touchDeltaXRef = useRef(0);
  
  const USE_DEMO_DATA = false;

  useEffect(() => {
    const fetchRestaurantDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        let detailResponse;
        let infoResponse;

        if (USE_DEMO_DATA) {
          detailResponse = {
            result: {
              menu_grp_list: [
                { patsto_no: '1204427', menu_grp_id: '00000000', menu_grp_nm: '대표메뉴', menu_grp_expl: '교촌의 시그니처 메뉴', sort_ord: 0 },
                { patsto_no: '1204427', menu_grp_id: '70000029', menu_grp_nm: '신메뉴', menu_grp_expl: '새롭게 출시된 메뉴', sort_ord: 1 }
              ],
              menu_list: [
                { patsto_no: '1204427', menu_id: '30000364', menu_grp_id: '00000000', menu_nm: '마라레드윙박스', menu_cmps_cont: '맛있게 매운 레드 소스에 마라를 더해 얼얼하고 화끈한 윙 메뉴 [16pcs / 날개(윙+봉)]', menu_img_file: 'https://picsum.photos/300/200?random=1', pplrt_menu_yn: '1', new_menu_yn: '0', min_menu_prc: 22000.0, menu_unitprc: '22,000원' },
                { patsto_no: '1204427', menu_id: '30000345', menu_grp_id: '00000000', menu_nm: '후라이드양념반반한마리', menu_cmps_cont: '바삭한 후라이드와 새콤달콤한 양념치킨을 동시에 즐길 수 있는 메뉴', menu_img_file: 'https://picsum.photos/300/200?random=2', pplrt_menu_yn: '0', new_menu_yn: '1', min_menu_prc: 22000.0, menu_unitprc: '22,000원' },
                { patsto_no: '1204427', menu_id: '30000341', menu_grp_id: '70000029', menu_nm: '허니윙박스', menu_cmps_cont: '달콤한 허니 소스가 일품인 겉바속촉 윙 메뉴 [16pcs / 날개(윙+봉)]', menu_img_file: 'https://picsum.photos/300/200?random=3', pplrt_menu_yn: '0', new_menu_yn: '0', min_menu_prc: 22000.0, menu_unitprc: '22,000원' }
              ]
            }
          };
          infoResponse = {
            result: {
              dma_shop_home_info: {
                patsto_no: id,
                patsto_nm: '가게명',
                biz_stat_msg_cont: '영업중',
                rpsnt_cat_nm: '치킨',
                good_cnt: 0,
                wish_cnt: 0,
                delv_tm: '20~40분',
                delv_fee: '0원',
                deli_min_ord_amt: '0원'
              },
              shop_img_list: [
                { rpsnt_img_file_nm: 'https://picsum.photos/1200/600?random=11' },
                { rpsnt_img_file_nm: 'https://picsum.photos/1200/600?random=12' },
                { rpsnt_img_file_nm: 'https://picsum.photos/1200/600?random=13' }
              ]
            }
          };
        } else {
          const [detail, info] = await Promise.all([
            getRestaurantDetail(id),
            getRestaurantInfo(id)
          ]);
          detailResponse = detail;
          infoResponse = info;
        }

        console.log('DETAIL 응답:', detailResponse);
        console.log('INFO 응답:', infoResponse);

        let data;
        if (detailResponse && detailResponse.result) {
          data = detailResponse.result;
        } else if (detailResponse && detailResponse.menuGroups && detailResponse.menuList) {
          data = { menu_grp_list: detailResponse.menuGroups, menu_list: detailResponse.menuList };
        } else if (detailResponse && detailResponse.menuGrpList) {
          data = { menu_grp_list: detailResponse.menuGrpList, menu_list: detailResponse.menuList };
        } else {
          console.error('지원되지 않는 상세 응답 구조:', detailResponse);
          setError('가게 정보를 찾을 수 없습니다. 상세 응답 구조가 올바르지 않습니다.');
          return;
        }

        const menuGroups = {};
        if (data.menu_grp_list) {
          data.menu_grp_list.forEach(group => {
            menuGroups[group.menu_grp_id] = {
              id: group.menu_grp_id,
              name: group.menu_grp_nm,
              description: group.menu_grp_expl,
              sortOrder: group.sort_ord,
              menus: []
            };
          });
        }
        if (data.menu_list) {
          data.menu_list.forEach(menu => {
            if (menu.menu_grp_id && menuGroups[menu.menu_grp_id]) {
              menuGroups[menu.menu_grp_id].menus.push({
                id: menu.menu_id,
                name: menu.menu_nm,
                description: menu.menu_cmps_cont,
                price: menu.min_menu_prc,
                image: menu.menu_img_file,
                isPopular: menu.pplrt_menu_yn === '1',
                isNew: menu.new_menu_yn === '1',
                isRecommended: menu.rcmd_yn === '1',
                isSale: menu.sale_menu_yn === '1',
                isHidden: menu.hide_yn === '1',
                isAlcohol: menu.alc_menu_yn === '1',
                spicyLevel: menu.menu_spicy_level,
                unitPrice: menu.menu_unitprc
              });
            }
          });
        }

        const homeInfo = infoResponse?.result?.dma_shop_home_info;
        const imgList = infoResponse?.result?.shop_img_list || [];
        const images = imgList.map(x => x.rpsnt_img_file_nm).filter(Boolean);
        const firstImage = images[0];

        const restaurantInfo = {
          id,
          name: homeInfo?.patsto_nm || '가게명을 불러오는 중...',
          image: firstImage || 'https://picsum.photos/400/300?random=1',
          images: images.length ? images : [firstImage || 'https://picsum.photos/400/300?random=1'],
          rating: homeInfo?.good_cnt ? Number(homeInfo.good_cnt) : 0,
          reviewCount: homeInfo?.good_cnt ? Number(homeInfo.good_cnt) : 0,
          deliveryFee: homeInfo?.delv_fee || '배달비 정보 없음',
          deliveryTime: homeInfo?.delv_tm || '배달시간 정보 없음',
          minOrder: homeInfo?.deli_min_ord_amt || '최소주문 정보 없음',
          description: homeInfo?.biz_stat_msg_cont || '',
          categories: homeInfo?.rpsnt_cat_nm ? [homeInfo.rpsnt_cat_nm] : []
        };

        const restaurantData = {
          ...restaurantInfo,
          menuGroups: Object.values(menuGroups).sort((a, b) => a.sortOrder - b.sortOrder)
        };

        setRestaurant(restaurantData);
        setCurrentImageIndex(0);
      } catch (err) {
        console.error('가게 상세 통합 조회 실패:', err);
        setError(err.message || '가게 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchRestaurantDetail();
    }
  }, [id, USE_DEMO_DATA]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleMenuClick = (menu) => {
    navigate(`/menus/${menu.id}`, { state: { menu, patstoNo: id } });
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const handleOrderClick = () => {
    console.log('주문하기 클릭', cartItems);
  };

  const goToPrevImage = () => {
    if (!restaurant?.images?.length) return;
    setCurrentImageIndex(prev => (prev - 1 + restaurant.images.length) % restaurant.images.length);
  };

  const goToNextImage = () => {
    if (!restaurant?.images?.length) return;
    setCurrentImageIndex(prev => (prev + 1) % restaurant.images.length);
  };

  const onTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
  };

  const onTouchMove = (e) => {
    if (touchStartXRef.current == null) return;
    const currentX = e.touches[0].clientX;
    touchDeltaXRef.current = currentX - touchStartXRef.current;
  };

  const onTouchEnd = () => {
    const threshold = 50; // 스와이프 민감도
    if (touchDeltaXRef.current > threshold) {
      goToPrevImage();
    } else if (touchDeltaXRef.current < -threshold) {
      goToNextImage();
    }
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={handleBackClick}>뒤로 가기</button>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className={styles.errorContainer}>
        <p>가게 정보를 찾을 수 없습니다.</p>
        <button onClick={handleBackClick}>뒤로 가기</button>
      </div>
    );
  }

  const totalImages = restaurant.images?.length || 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBackClick}>←</button>
        <h1 className={styles.restaurantName}>{restaurant.name}</h1>
        <button className={styles.shareButton}>공유</button>
      </div>

      {/* 이미지 캐러셀 */}
      <div 
        className={styles.carousel}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          className={styles.carouselTrack}
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {(restaurant.images || [restaurant.image]).map((src, idx) => (
            <div key={idx} className={styles.carouselSlide}>
              <img 
                src={src}
                alt={`${restaurant.name} 이미지 ${idx + 1}`}
                className={styles.restaurantImage}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          ))}
        </div>

        {totalImages > 1 && (
          <div className={styles.carouselIndicator}>
            <button 
              className={styles.indicatorNav}
              onClick={goToPrevImage}
              aria-label="이전 이미지"
            >
              ‹
            </button>
            <span className={styles.indicatorText}>{currentImageIndex + 1}/{totalImages}</span>
            <button 
              className={styles.indicatorNav}
              onClick={goToNextImage}
              aria-label="다음 이미지"
            >
              ›
            </button>
          </div>
        )}
      </div>

      <div className={styles.infoSection}>
        <div className={styles.basicInfo}>
          <h2 className={styles.restaurantName}>{restaurant.name}</h2>
          <p className={styles.description}>{restaurant.description}</p>
          <div className={styles.categories}>
            {restaurant.categories.map((category, index) => (
              <span key={index} className={styles.categoryTag}>{category}</span>
            ))}
          </div>
        </div>

        <div className={styles.deliveryInfo}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>배달비</span>
            <span className={styles.infoValue}>{restaurant.deliveryFee}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>배달시간</span>
            <span className={styles.infoValue}>{restaurant.deliveryTime}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>최소주문</span>
            <span className={styles.infoValue}>{restaurant.minOrder}</span>
          </div>
        </div>
      </div>

      <div className={styles.menuSection}>
        <h3 className={styles.sectionTitle}>메뉴</h3>
        {restaurant.menuGroups.map((group) => (
          <div key={group.id} className={styles.menuGroup}>
            <h4 className={styles.menuGroupTitle}>{group.name}</h4>
            {group.description && <p className={styles.menuGroupDescription}>{group.description}</p>}
            <div className={styles.menuGrid}>
              {group.menus.map((menu) => (
                <div key={menu.id} className={`${styles.menuItem}`} onClick={() => handleMenuClick(menu)}>
                  <div className={styles.menuInfo} style={{ paddingRight: menu.image ? '16px' : '0' }}>
                    <h4 className={styles.menuName}>{menu.name}</h4>
                    <p className={styles.menuDescription}>{menu.description}</p>
                    <div className={styles.menuActions}>
                      <span className={styles.menuPrice}>{menu.price ? menu.price.toLocaleString() + '원' : menu.unitPrice}</span>
                    </div>
                  </div>
                  {menu.image && (
                    <div className={styles.menuImage}>
                      <img src={menu.image} alt={menu.name} onError={(e) => { e.target.style.display = 'none'; }} />
                      {menu.isPopular && <span className={styles.popularBadge}>인기</span>}
                      {menu.isNew && <span className={styles.newBadge}>신메뉴</span>}
                      {menu.isSale && <span className={styles.saleBadge}>할인</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default RestaurantDetail;
