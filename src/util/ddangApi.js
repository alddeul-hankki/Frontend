import { ddangyoApi } from './api.js';

/**
 * 가게 목록 조회 (POST 요청)
 * @param {Object} requestBody - 요청 body 객체
 * @param {string} requestBody.category_cd - 카테고리 코드 ('03' for 치킨, '04' for 피자)
 * @param {string} requestBody.sort_cd - 정렬 코드 ('06' for 리뷰순, '05' for 맛있어요순)
 * @param {number} requestBody.page_no - 페이지 번호 (기본값: 1)
 * @param {number} requestBody.page_size - 페이지 크기 (기본값: 30)
 * @param {number} requestBody.map_lngt - 경도
 * @param {number} requestBody.map_latt - 위도
 * @returns {Promise<Array>} 가게 목록 데이터
 */
export const getRestaurants = async (requestBody) => {
    const defaultBody = {
        sale_bnft_filter_cd: "000",
        onnuri_cd: "00",
        delv_fee_filter_cd: "4",
        min_ord_amt_filter_cd: "4",
        reuse_cd: "00",
        page_no: 1,
        page_size: 30,
        ...requestBody
    };

    const response = await ddangyoApi.post('/restaurants', defaultBody);
    return response.data;
};

/**
 * 특정 가게의 상세 정보를 조회합니다 (POST 요청)
 * @param {string} patstoNo - 가게 고유 번호
 * @param {Object} additionalData - 추가 데이터 (선택사항)
 * @returns {Promise<Object>} 가게 상세 데이터
 */
export const getRestaurantDetail = async (patstoNo, additionalData = {}) => {
    const requestBody = {
        dma_shop_search: {
            login_mbr_id: "",
            patsto_no: patstoNo,
            admtn_dong_cd: "4146354000",
            map_latt: "37.2283608",
            map_lngt: "127.1126139",
            patsto_tab_div_cd: "01",
            exps_chan: "01",
            rest_patsto_yn: "0",
            ...additionalData
        }
    };

    const response = await ddangyoApi.post('/restaurants/detail', requestBody);
    return response.data;
};

// --- 편의 함수들 ---

/**
 * 맛있어요 많은 순으로 가게 목록 조회
 */
export const getRestaurantsByTasteRating = async (category_cd, options = {}) => {
    return await getRestaurants({
        category_cd,
        sort_cd: "05",
        ...options
    });
};

/**
 * 리뷰 많은 순으로 가게 목록 조회
 */
export const getRestaurantsByReviewCount = async (category_cd, options = {}) => {
    return await getRestaurants({
        category_cd,
        sort_cd: "06",
        ...options
    });
};