import React from 'react';
import Header from './components/Header/Header';
import FilterBar from './components/FilterBar/FilterBar';
import FoodList from './components/FoodList/FoodList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <FilterBar />
      <FoodList />
    </div>
  );
}

export default App;
