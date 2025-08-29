import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getMenuOptions } from '../../util/ddangApi';
import { addToCartAndNavigate, createOrderFromMenu } from '../../util/orderUtils';
import styles from './MenuDetail.module.css';

const OptionGroup = ({ group, selectedOptionIds, onToggleOption }) => {
  return (
    <div className={styles.optionGroup}>
      <div className={styles.optionGroupHeader}>
        <h3 className={styles.optionGroupTitle}>{group.name}</h3>
        <span className={styles.optionGroupMeta}>
          {group.minSelect > 0 ? `최소 ${group.minSelect}개` : '선택'}
          {group.maxSelect > 0 ? ` / 최대 ${group.maxSelect}개` : ''}
        </span>
      </div>
      <div className={styles.optionList}>
        {group.options.map((opt) => {
          const checked = selectedOptionIds.has(opt.id);
          return (
            <label key={opt.id} className={styles.optionRow}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggleOption(group.id, opt)}
              />
              <div className={styles.optionTextWrap}>
                <span className={styles.optionName}>{opt.name}</span>
                <span className={styles.optionPrice}>+ {opt.price.toLocaleString()}원</span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

const MenuDetail = () => {
  const { menuId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { menu: passedMenu, patstoNo: passedPatstoNo, groupOrderInfo } = location.state || {};

  const [patstoNo, setPatstoNo] = useState(passedPatstoNo || '');
  const [menu, setMenu] = useState(passedMenu || null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [optionGroups, setOptionGroups] = useState([]);
  const [selectedOptionIds, setSelectedOptionIds] = useState(new Set());

  useEffect(() => {
    if (!menu) {
      setMenu({
        id: menuId,
        name: '메뉴명',
        description: '메뉴 설명을 불러오는 중...',
        price: 0,
        unitPrice: '0원',
        image: 'https://picsum.photos/400/300?random=1'
      });
    }
    if (!patstoNo && passedPatstoNo) setPatstoNo(passedPatstoNo);
  }, [menuId, menu, patstoNo, passedPatstoNo]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setIsLoading(true);
        if (!patstoNo) {
          console.warn('patstoNo가 없어 옵션 API를 호출하지 않습니다.');
          setIsLoading(false);
          return;
        }
        const res = await getMenuOptions(patstoNo, menuId);
        const menuInfo = res?.result?.menu_info;
        const grpList = res?.result?.optn_grp_list || [];
        const optList = res?.result?.optn_list || [];

        setMenu((prev) => ({
          ...(prev || {}),
          name: menuInfo?.menu_nm || prev?.name || '메뉴명',
          description: menuInfo?.menu_cmps_cont || prev?.description || '',
          image: menuInfo?.menu_img_file_nm || prev?.image || ''
        }));

        const groupIdToGroup = {};
        grpList.forEach((g) => {
          groupIdToGroup[g.optn_grp_id] = {
            id: g.optn_grp_id,
            name: g.optn_grp_nm,
            essential: g.essntl_optn_yn === '1',
            minSelect: g.min_slct_cnt || 0,
            maxSelect: g.max_slct_cnt || 0,
            options: []
          };
        });
        optList.forEach((o) => {
          const group = groupIdToGroup[o.optn_grp_id];
          if (group) {
            group.options.push({
              id: o.optn_id,
              name: o.optn_nm,
              price: Number(o.optn_unitprc) || 0,
              groupId: o.optn_grp_id,
              groupName: groupIdToGroup[o.optn_grp_id]?.name || ''
            });
          }
        });

        setOptionGroups(Object.values(groupIdToGroup));
      } catch (e) {
        console.error('메뉴 옵션 조회 실패:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, [patstoNo, menuId]);

  const basePrice = useMemo(() => {
    if (!menu) return 0;
    if (typeof menu.price === 'number') return menu.price;
    if (typeof menu.unitPrice === 'string') {
      const n = Number(menu.unitPrice.replace(/[^0-9]/g, ''));
      return isNaN(n) ? 0 : n;
    }
    return 0;
  }, [menu]);

  const optionsTotal = useMemo(() => {
    if (!optionGroups.length || selectedOptionIds.size === 0) return 0;
    let sum = 0;
    optionGroups.forEach((g) => {
      g.options.forEach((o) => {
        if (selectedOptionIds.has(o.id)) sum += o.price;
      });
    });
    return sum;
  }, [optionGroups, selectedOptionIds]);

  const totalPrice = useMemo(() => (basePrice + optionsTotal) * quantity, [basePrice, optionsTotal, quantity]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleQuantityChange = (change) => {
    const next = quantity + change;
    if (next >= 1 && next <= 99) setQuantity(next);
  };

  const onToggleOption = (groupId, option) => {
    setSelectedOptionIds((prev) => {
      const next = new Set(prev);
      const group = optionGroups.find((g) => g.id === groupId);
      if (!next.has(option.id)) {
        if (group && group.maxSelect > 0) {
          const selectedInGroup = group.options.filter((o) => next.has(o.id)).length;
          if (selectedInGroup >= group.maxSelect) return next; // 초과 방지
        }
        next.add(option.id);
      } else {
        next.delete(option.id);
      }
      return next;
    });
  };

  const handleAddToCart = () => {
    console.log('🛒 주문담기 버튼 클릭');
    console.log('📍 menu:', menu);
    console.log('📍 patstoNo:', patstoNo);
    console.log('📍 quantity:', quantity);
    
    const selectedOptions = [];
    optionGroups.forEach((g) => {
      g.options.forEach((o) => {
        if (selectedOptionIds.has(o.id)) selectedOptions.push(o);
      });
    });
    
    console.log('📍 selectedOptions:', selectedOptions);

    // 주문 데이터 생성
    const orderData = createOrderFromMenu(
      menu, 
      patstoNo, 
      quantity, 
      selectedOptions
    );
    
    // 그룹 주문 정보가 있으면 추가
    if (location.state?.groupOrderInfo) {
      const g = location.state.groupOrderInfo;
      orderData.groupOrderInfo = {
        pickupZoneId: g.pickupZoneId,
        pickupZoneName: g.pickupZoneName,
        deadlineTime: g.deadlineTime || (g.timeRange || '').split('-')[0] || '',
        pickupTime: g.pickupTime || (g.timeRange || '').split('-')[1] || ''
      };
      console.log('📦 groupOrderInfo 포함하여 Solsolpay로 전달:', orderData.groupOrderInfo);
    }
    
    console.log('✅ 생성된 주문 데이터:', orderData);

    // Solsolpay 페이지로 이동
    addToCartAndNavigate(navigate, orderData);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!menu) {
    return (
      <div className={styles.errorContainer}>
        <p>메뉴 정보를 찾을 수 없습니다.</p>
        <button onClick={handleBackClick}>뒤로 가기</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBackClick}>←</button>
        <h1 className={styles.pageTitle}>메뉴 상세</h1>
        <div className={styles.headerSpacer}></div>
      </div>

      {/* 메뉴 이미지 */}
      <div className={styles.imageSection}>
        {menu.image && (
          <img src={menu.image} alt={menu.name} className={styles.menuImage} />
        )}
      </div>

      {/* 메뉴 기본 정보 */}
      <div className={styles.menuInfo}>
        <h2 className={styles.menuName}>{menu.name}</h2>
        <p className={styles.menuDescription}>{menu.description}</p>
        <div className={styles.priceSection}>
          <span className={styles.price}>{basePrice.toLocaleString()}원</span>
        </div>
      </div>

      {/* 옵션 그룹들 */}
      {optionGroups.length > 0 && (
        <div className={styles.optionSection}>
          {optionGroups.map((g) => (
            <OptionGroup
              key={g.id}
              group={g}
              selectedOptionIds={selectedOptionIds}
              onToggleOption={onToggleOption}
            />
          ))}
        </div>
      )}

      {/* 수량 선택 및 담기 */}
      <div className={styles.actionSection}>
        <div className={styles.quantitySelector}>
          <span className={styles.quantityLabel}>수량</span>
          <div className={styles.quantityControls}>
            <button className={styles.quantityButton} onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
            <span className={styles.quantityValue}>{quantity}</span>
            <button className={styles.quantityButton} onClick={() => handleQuantityChange(1)} disabled={quantity >= 99}>+</button>
          </div>
        </div>

        <button className={styles.addToCartButton} onClick={handleAddToCart}>
          {(totalPrice).toLocaleString()}원 담기
        </button>
      </div>
    </div>
  );
};

export default MenuDetail;
