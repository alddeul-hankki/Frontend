import FilterBar from './FilterBar/FilterBar';
import RestaurantList from './Restaurant/RestaurantList/RestaurantList';
import WaitingRoomList from './WaitingRoom/WaitingRoomList/WaitingRoomList';

export default function Main() {
  return (
    <>
      <FilterBar />
      <WaitingRoomList />
      <RestaurantList />
    </>
  );
};
