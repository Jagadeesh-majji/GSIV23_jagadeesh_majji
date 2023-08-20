import React, { Component } from 'react';
import MovieBrowser from './modules/movie-browser/movie-browser.container';
import MovieDescriptionComponent from './modules/movie-browser/movie-description/movie-description.container';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route key="landing" caseSensitive path="/" element={<MovieBrowser />} />
        <Route key="description" caseSensitive path="/description/:id" element={<MovieDescriptionComponent />} />
        <Route key="landing" caseSensitive path="*" element={<MovieBrowser />} />
      </Routes>

    </>
  );
}

export default App;
