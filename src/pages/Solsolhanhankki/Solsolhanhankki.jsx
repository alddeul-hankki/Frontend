import React, { useState } from 'react';
import FilterBar from '../../components/SolsolMain/FilterBar/FilterBar';
import RestaurantList from '../../components/SolsolMain/Restaurant/RestaurantList/RestaurantList';
import WaitingRoomList from '../../components/SolsolMain/WaitingRoom/WaitingRoomList/WaitingRoomList';

export default function Solsolhanhankki() {
  const [filters, setFilters] = useState({
    sort_cd: '06', // 기본값: 리뷰순
    category_cd: '03', // 기본값: 치킨
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <FilterBar onFilterChange={handleFilterChange} />
      <WaitingRoomList />
      <RestaurantList filters={filters} />
    </>
  );
};
