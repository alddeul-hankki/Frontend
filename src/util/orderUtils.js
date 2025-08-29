import { orderPreview } from './solsolApi';

// 주문 미리보기 데이터를 생성하는 함수
export const createOrderPreviewData = (storeId, orderItems) => {
  return {
    storeId,
    orderItems: orderItems.map(item => ({
      menuId: item.menuId,
      menuName: item.menuName,
      options: item.options || '',
      pricePerItem: item.pricePerItem,
      quantity: item.quantity
    }))
  };
};

// 주문담기 데이터를 생성하는 함수 (메뉴 상세에서 사용)
export const createOrderFromMenu = (menu, storeId, quantity = 1, selectedOptions = []) => {
  console.log('🔧 createOrderFromMenu 호출');
  console.log('📍 menu:', menu);
  console.log('📍 storeId:', storeId);
  console.log('📍 quantity:', quantity);
  console.log('📍 selectedOptions:', selectedOptions);
  
  // 옵션 가격 계산
  const optionsTotal = selectedOptions.reduce((sum, opt) => sum + (opt.price || 0), 0);
  const totalPricePerItem = (menu.price || 0) + optionsTotal;
  
  const orderData = {
    storeId,
    orderItems: [{
      menuId: menu.id,
      menuName: menu.name,
      options: selectedOptions.map(opt => opt.name).join(', '),
      pricePerItem: totalPricePerItem,
      quantity: quantity
    }]
  };
  
  console.log('✅ 생성된 orderData:', orderData);
  return orderData;
};

// 주문담기 후 Solsolpay 페이지로 이동하는 함수
export const addToCartAndNavigate = (navigate, orderData) => {
  console.log('🚀 addToCartAndNavigate 호출');
  console.log('📍 orderData:', orderData);
  
  navigate('/solsolpay', { 
    state: { 
      previewData: orderData 
    } 
  });
  
  console.log('✅ Solsolpay 페이지로 이동 완료');
};

// 주문 페이지로 이동하는 함수
export const navigateToOrderPage = (navigate, previewData) => {
  navigate('/solsolpay', { 
    state: { 
      previewData 
    } 
  });
};

export const calculateRemainingAmount = (room) => {
  return room.amountToTarget;
};

// 주문 미리보기 요청 함수
export const requestOrderPreview = async (requestBody) => {
  try {
    const response = await orderPreview(requestBody);
    return response;
  } catch (error) {
    console.error('Failed to get order preview:', error);
    throw error;
  }
};
