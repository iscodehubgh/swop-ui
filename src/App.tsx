import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AddArticle from './pages/AddArticle';
import Login from './pages/Home';
import MyOffers from './pages/MyOffers';
import SwopDraft from './pages/SwopDraft';
import SwopRequests from './pages/SwopRequests';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/swop/draft/:draftId" element={<SwopDraft />} />
        <Route path="/articles/add" element={<AddArticle />} />
        <Route path="/offers/my" element={<MyOffers />} />
        <Route path="/swop/requests" element={<SwopRequests />} />
      </Routes>
    </div>
  );
}

export default App;
