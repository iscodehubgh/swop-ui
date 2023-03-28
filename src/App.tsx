import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/home/Home';
import Swop from './pages/swop/Swop';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/swop/draft/:draftId" element={<Swop />} />
      </Routes>
    </div>
  );
}

export default App;
