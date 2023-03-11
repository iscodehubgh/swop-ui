import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
