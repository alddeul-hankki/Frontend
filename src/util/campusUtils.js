const CAMPUS_ID_KEY = 'campusId';

export const getCampusId = () => {
  const campusId = localStorage.getItem(CAMPUS_ID_KEY);
  return campusId ? parseInt(campusId, 10) : 1; // 기본값 1
};

export const setCampusId = (campusId) => {
  localStorage.setItem(CAMPUS_ID_KEY, campusId.toString());
};

export const DEFAULT_CAMPUS_ID = 1;
