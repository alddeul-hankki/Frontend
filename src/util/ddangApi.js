import { post } from './api';

/**
 * 카테고리별 가게 리스트 조회
 * @param {*} map_latt 위도
 * @param {*} category_cd 카테고리 코드
 * @param {*} map_lngt 경도
 * @param {*} admtn_dong_cd 동 코드
 * @returns 
 */
async function getStoresByCategory(map_latt, category_cd, map_lngt, admtn_dong_cd) {
    const body = {
        dma_pack_search: {
            map_latt: map_latt,
            category_cd: category_cd,
            map_lngt: map_lngt,
            admtn_dong_cd: admtn_dong_cd
        }
    };
    
    const response = await post('/home/cat/section/patsto-list', body);
    return response;
}

// 공통 파라미터 생성 함수
function createCommonParams(map_latt, map_lngt, category_cd, admtn_dong_cd, page_no = 1, page_size = 30) {
    return {
        admtn_dong_cd: admtn_dong_cd.toString(),
        sort_cd: "01", // 기본값
        reuse_cd: "00",
        sale_bnft_filter_cd: "000",
        onnuri_cd: "00",
        min_ord_amt_filter_cd: "4",
        delv_fee_filter_cd: "4",
        category_cd: category_cd.toString(),
        page_size: page_size,
        page_no: page_no,
        map_latt: map_latt,
        map_lngt: map_lngt
    };
}

// 정렬 옵션별 가게 리스트 조회 함수들
async function getStoresBySort(map_latt, map_lngt, category_cd, admtn_dong_cd, sort_cd, page_no = 1, page_size = 30) {
    const body = createCommonParams(map_latt, map_lngt, category_cd, admtn_dong_cd, page_no, page_size);
    body.sort_cd = sort_cd;
    
    const response = await post('/home/delivery/patsto-list', body);
    return response;
}

// 추천순
async function getStoresByRecommendation(map_latt, map_lngt, category_cd, admtn_dong_cd, page_no = 1, page_size = 30) {
    return await getStoresBySort(map_latt, map_lngt, category_cd, admtn_dong_cd, "01", page_no, page_size);
}

// 주문 많은 순
async function getStoresByOrderCount(map_latt, map_lngt, category_cd, admtn_dong_cd, page_no = 1, page_size = 30) {
    return await getStoresBySort(map_latt, map_lngt, category_cd, admtn_dong_cd, "03", page_no, page_size);
}

// 배달 빠른 순
async function getStoresByDeliverySpeed(map_latt, map_lngt, category_cd, admtn_dong_cd, page_no = 1, page_size = 30) {
    return await getStoresBySort(map_latt, map_lngt, category_cd, admtn_dong_cd, "04", page_no, page_size);
}

// 맛있어요 많은 순
async function getStoresByTasteRating(map_latt, map_lngt, category_cd, admtn_dong_cd, page_no = 1, page_size = 30) {
    return await getStoresBySort(map_latt, map_lngt, category_cd, admtn_dong_cd, "05", page_no, page_size);
}

// 찜 많은 순
async function getStoresByFavoriteCount(map_latt, map_lngt, category_cd, admtn_dong_cd, page_no = 1, page_size = 30) {
    return await getStoresBySort(map_latt, map_lngt, category_cd, admtn_dong_cd, "06", page_no, page_size);
}

// 가까운 순
async function getStoresByDistance(map_latt, map_lngt, category_cd, admtn_dong_cd, page_no = 1, page_size = 30) {
    return await getStoresBySort(map_latt, map_lngt, category_cd, admtn_dong_cd, "07", page_no, page_size);
}

export { 
    getStoresByCategory,
    getStoresBySort,
    getStoresByRecommendation,
    getStoresByOrderCount,
    getStoresByDeliverySpeed,
    getStoresByTasteRating,
    getStoresByFavoriteCount,
    getStoresByDistance
};